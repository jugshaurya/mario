  var score = 0;
  var scoreText;
  var gameOver;
  var game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene :{
        preload: preload,
        create: create,
        update: update
    },
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
    },

  });


  function preload () {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }


  function create (){
    // //  all Game Objects are positioned based on their center by default
    this.add.image(400, 300, 'sky')
    // // The order in which game objects are displayed matches the order in which you create them. 
    // // Under the hood this.add.image is creating a new Image Game Object 
    // // and adding it to the current Scenes display list
    

    // // The Scene itself has no fixed size and extends infinitely in all directions. 
    // // The Camera system controls your view into the Scene and you can move 
    // // and zoom the active camera as required. 
    
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setCollideWorldBounds(true);
    player.setBounce(.1);
    
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    player.body.setGravityY(100)
    this.physics.add.collider(player, platforms);

    
    cursors = this.input.keyboard.createCursorKeys();

    
    stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0, 0.4));
    });
    
    this.physics.add.collider(stars, platforms);

    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    function hitBomb (player, bomb){
        this.physics.pause();
        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }
    this.physics.add.overlap(player, stars, collectStar, null, this);
    function collectStar (player, star){
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0){
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });


    // bomb

  }
  
  
  function update (){
    if (cursors.left.isDown){
      player.setVelocityX(-160);
        player.anims.play('left', true);
      }
    else if (cursors.right.isDown){
      player.setVelocityX(160);
        player.anims.play('right', true);
      }
    else{
      player.setVelocityX(0);
        player.anims.play('turn');
    }
    
    if (cursors.up.isDown && player.body.touching.down){
      player.setVelocityY(-400);
    }
    
  }
  
