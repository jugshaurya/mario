class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
  }

  create() {
    this.isDead = false;
    this.isInvincible = false;
    this.hasWon = false;

    // Sky background
    this.cameras.main.setBackgroundColor('#6b8cff');
    this.cameras.main.fadeIn(500, 0, 0, 0);

    // Tilemap
    this.map = this.make.tilemap({ key: 'level1', tileHeight: 16, tileWidth: 16 });
    this.tileset = this.map.addTilesetImage('tileset_gutter');

    // Layers
    this.backgroundLayer = this.map.createStaticLayer('Background Layer', this.tileset);
    this.graphicLayer = this.map.createDynamicLayer('Graphic Layer', this.tileset);

    // World bounds
    this.physics.world.bounds.width = this.graphicLayer.width;
    this.physics.world.bounds.height = this.graphicLayer.height;

    // Collision groups — use the original approach that works with Phaser 3.19
    this.groundGroup = this.addGroup('Ground');
    this.groundGroup.setDepth(-1);

    this.brickGroup = this.addGroup('Bricks');
    this.brickGroup.setDepth(-1);

    this.coinGroup = this.addGroup('Coins');
    this.coinGroup.setDepth(-1);

    this.pipeGroup = this.addGroup('Pipes');
    this.pipeGroup.setDepth(-1);

    // Mario
    this.mario = this.physics.add.sprite(50, 16 * 10, 'mario');
    this.mario.body.setCollideWorldBounds(true);
    this.mario.setDepth(10);

    // Controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // Mario collisions
    this.physics.add.collider(this.mario, this.groundGroup);
    this.physics.add.collider(this.mario, this.pipeGroup);

    // Brick collision — hitting from below destroys brick
    this.physics.add.collider(this.mario, this.brickGroup, (mario, brick) => {
      if (mario.body.touching.up) {
        this.brickBounce(brick);
      }
    });

    // Coin collision — hitting from below collects coin
    this.physics.add.collider(this.mario, this.coinGroup, (mario, coin) => {
      if (mario.body.touching.up) {
        this.collectCoin(coin);
      }
    });

    // Camera — zoom to fit level height to screen
    const levelHeight = this.graphicLayer.height;
    const screenHeight = this.cameras.main.height;
    const zoom = screenHeight / levelHeight;
    this.cameras.main.setZoom(zoom);
    this.cameras.main.startFollow(this.mario);
    this.cameras.main.setBounds(0, 0, this.graphicLayer.width, levelHeight);
    this.cameras.main.setFollowOffset(0, 0);

    // Enemies
    this.goombas = [];
    this.turtles = [];
    this.fillEnemyArray('Goombas', 'goomba', this.goombas);
    this.fillEnemyArray('Turtles', 'turtle', this.turtles);

    this.setupEnemyPhysics(this.goombas);
    this.setupEnemyPhysics(this.turtles);

    // Mario vs enemies
    this.goombas.forEach((e) => {
      this.physics.add.collider(this.mario, e.sprite, () => this.handleEnemyCollision(e));
    });
    this.turtles.forEach((e) => {
      this.physics.add.collider(this.mario, e.sprite, () => this.handleEnemyCollision(e));
    });

    // Death zone — falling off the map
    this.deathZone = this.graphicLayer.height + 32;

    // Launch HUD
    this.scene.launch('hud-scene');

    // Time up listener
    this.events.on('time-up', () => {
      if (!this.isDead) this.mariodie();
    });
  }

  update(time, delta) {
    if (this.isDead || this.hasWon) return;

    // Fall death
    if (this.mario.y > this.deathZone) {
      this.mariodie();
      return;
    }

    const onGround = this.mario.body.touching.down || this.mario.body.blocked.down;
    const pressingLeft = this.cursors.left.isDown || this.wasd.left.isDown;
    const pressingRight = this.cursors.right.isDown || this.wasd.right.isDown;
    const pressingJump = this.cursors.up.isDown || this.wasd.up.isDown;

    // Horizontal movement with acceleration
    const maxSpeed = 150;
    const accel = 600;
    const decel = 500;

    if (pressingLeft) {
      if (this.mario.body.velocity.x > 0 && onGround) {
        this.mario.anims.play('mario-skid', true);
        this.mario.body.velocity.x -= decel * (delta / 1000);
      } else {
        this.mario.body.velocity.x = Math.max(this.mario.body.velocity.x - accel * (delta / 1000), -maxSpeed);
        this.mario.flipX = true;
        if (onGround) this.mario.anims.play('mario-run', true);
      }
    } else if (pressingRight) {
      if (this.mario.body.velocity.x < 0 && onGround) {
        this.mario.anims.play('mario-skid', true);
        this.mario.body.velocity.x += decel * (delta / 1000);
      } else {
        this.mario.body.velocity.x = Math.min(this.mario.body.velocity.x + accel * (delta / 1000), maxSpeed);
        this.mario.flipX = false;
        if (onGround) this.mario.anims.play('mario-run', true);
      }
    } else {
      if (Math.abs(this.mario.body.velocity.x) < 10) {
        this.mario.body.velocity.x = 0;
      } else {
        this.mario.body.velocity.x *= 0.88;
      }
      if (onGround) this.mario.anims.play('mario-idle', true);
    }

    // Jump — variable height based on how long you hold
    if (pressingJump && onGround) {
      this.mario.setVelocityY(-270);
      this.jumpTimer = 0;
      this.isJumping = true;
    }

    if (this.isJumping && pressingJump && this.mario.body.velocity.y < 0) {
      this.jumpTimer += delta;
      if (this.jumpTimer < 250) {
        this.mario.body.velocity.y -= 5;
      }
    }

    if (!pressingJump) {
      this.isJumping = false;
      if (this.mario.body.velocity.y < -100) {
        this.mario.body.velocity.y = -100;
      }
    }

    // Air animation
    if (!onGround) {
      this.mario.anims.play('mario-jump', true);
    }

    // Enemy movement
    this.moveEnemies();

    // Win condition — reach end of level
    if (this.mario.x > this.graphicLayer.width - 80 && !this.hasWon) {
      this.winLevel();
    }
  }

  // --- Group from tilemap object layer (Phaser 3.19 compatible) ---
  addGroup(layerName) {
    const group = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    const objects = this.map.getObjectLayer(layerName)['objects'];

    objects.forEach((object, index) => {
      group.create(object.x, object.y, object);
      const obj = group.children.entries[index];
      obj.displayHeight = object.height - 2;
      obj.displayWidth = object.width;
      obj.displayOriginX = 0;
      obj.displayOriginY = 0;
    });

    return group;
  }

  // --- Enemies ---
  fillEnemyArray(layerName, character, enemyArray) {
    const objects = this.map.getObjectLayer(layerName)['objects'];
    objects.forEach((object) => {
      const sprite = this.physics.add.sprite(object.x, object.y, character);
      sprite.setDepth(5);
      enemyArray.push({
        sprite,
        velocity: 1.1,
        alive: true,
      });
    });
  }

  setupEnemyPhysics(enemies) {
    enemies.forEach((e) => {
      this.physics.add.collider(e.sprite, this.groundGroup);
      e.sprite.body.setCollideWorldBounds(true);

      this.physics.add.collider(e.sprite, this.pipeGroup, () => {
        e.velocity *= -1;
        if (e.sprite.texture.key === 'turtle') {
          e.sprite.flipX = e.velocity < 0;
        }
      });

      this.physics.add.collider(e.sprite, this.brickGroup);
    });
  }

  moveEnemies() {
    this.goombas.forEach((e) => {
      if (!e.alive) return;
      e.sprite.anims.play('goomba-walk', true);
      e.sprite.x -= e.velocity;
    });

    this.turtles.forEach((e) => {
      if (!e.alive) return;
      e.sprite.anims.play('turtle-walk', true);
      e.sprite.x -= e.velocity;
    });
  }

  handleEnemyCollision(enemy) {
    if (this.isDead || !enemy.alive || this.isInvincible) return;

    const marioBottom = this.mario.body.y + this.mario.body.height;
    const enemyTop = enemy.sprite.body.y;

    if (marioBottom < enemyTop + 8 && this.mario.body.velocity.y > 0) {
      // Stomp!
      this.mario.setVelocityY(-200);
      this.killEnemy(enemy);
      this.events.emit('add-score', 100);
      this.showScorePopup(enemy.sprite.x, enemy.sprite.y - 16, '100');
    } else {
      this.mariodie();
    }
  }

  killEnemy(enemy) {
    enemy.alive = false;
    const key = enemy.sprite.texture.key;

    if (key === 'goomba') {
      enemy.sprite.anims.play('goomba-death', true);
      enemy.sprite.body.enable = false;
      this.tweens.add({
        targets: enemy.sprite,
        alpha: 0,
        y: enemy.sprite.y + 4,
        duration: 600,
        delay: 200,
        onComplete: () => enemy.sprite.destroy(),
      });
    } else if (key === 'turtle') {
      enemy.sprite.anims.play('turtle-shell', true);
      enemy.sprite.body.enable = false;
      this.tweens.add({
        targets: enemy.sprite,
        alpha: 0,
        duration: 800,
        delay: 300,
        onComplete: () => enemy.sprite.destroy(),
      });
    }
  }

  // --- Bricks ---
  brickBounce(brick) {
    this.events.emit('add-score', 50);
    this.showScorePopup(brick.x, brick.y - 16, '50');

    this.tweens.add({
      targets: brick,
      y: brick.y - 6,
      duration: 80,
      yoyo: true,
      ease: 'Power1',
      onComplete: () => {
        brick.destroy();
      },
    });
  }

  // --- Coins ---
  collectCoin(coin) {
    this.events.emit('add-coin');
    this.showScorePopup(coin.x, coin.y - 20, '200');
    coin.destroy();
  }

  // --- Score popup ---
  showScorePopup(x, y, text) {
    const popup = this.add.text(x, y, text, {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 1,
    });
    popup.setOrigin(0.5);
    popup.setDepth(100);

    this.tweens.add({
      targets: popup,
      y: y - 20,
      alpha: 0,
      duration: 800,
      ease: 'Power2',
      onComplete: () => popup.destroy(),
    });
  }

  // --- Mario death ---
  mariodie() {
    if (this.isDead) return;
    this.isDead = true;

    this.events.emit('lose-life');
    this.mario.anims.play('mario-death', true);
    this.mario.body.enable = false;
    this.mario.setDepth(100);

    // Death jump animation
    this.tweens.add({
      targets: this.mario,
      y: this.mario.y - 40,
      duration: 400,
      ease: 'Power2',
      onComplete: () => {
        this.tweens.add({
          targets: this.mario,
          y: this.mario.y + 300,
          duration: 600,
          ease: 'Power1',
        });
      },
    });

    // Check lives and restart
    this.time.delayedCall(2000, () => {
      let lives = 0;
      this.events.emit('get-lives', (l) => { lives = l; });

      if (lives <= 0) {
        this.scene.stop('hud-scene');
        this.scene.start('gameover-scene');
      } else {
        this.events.emit('reset-timer');
        this.scene.restart();
      }
    });
  }

  // --- Win ---
  winLevel() {
    this.hasWon = true;
    this.mario.setVelocityX(80);
    this.mario.flipX = false;
    this.mario.anims.play('mario-run', true);

    this.events.emit('add-score', 5000);
    this.showScorePopup(this.mario.x, this.mario.y - 30, '5000');

    const cam = this.cameras.main;
    const winText = this.add.text(cam.width / 2, cam.height / 2 - 30, 'LEVEL\nCLEAR!', {
      fontFamily: '"Press Start 2P"',
      fontSize: '28px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
      align: 'center',
    });
    winText.setOrigin(0.5);
    winText.setDepth(100);
    winText.setScrollFactor(0);

    this.time.delayedCall(3000, () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.time.delayedCall(500, () => {
        this.scene.stop('hud-scene');
        this.scene.start('title-scene');
      });
    });
  }
}

export default GameScene;
