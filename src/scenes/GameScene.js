class GameScene extends Phaser.Scene {

  constructor() {
    super('game-scene')
  }

  create() {

    // 0. Creating Level with background and other Graphics - createLevelMap

    // 0.1 Adding tilemap + level1-json to get a LEVEL-map
    // this.cameras.main.setBackgroundColor('#FFF')
    this.map = this.make.tilemap({
      key: 'level1',
      tileHeight: 16,
      tileWidth: 16
    })


    this.complete_map = this.map.addTilesetImage('tileset_gutter')


    // 1. Loading Background 
    this.backgroundLayer = this.map.createStaticLayer('Background Layer', this.complete_map)
    
    // 2. Loading graphic layer for rest of level-graphics and setting world Bound according to this layer
    this.graphicLayer = this.map.createDynamicLayer('Graphic Layer', this.complete_map)
    this.physics.world.bounds.width = this.graphicLayer.width // so that anything woith setCollideWorldBounds true dont go out of screen
    
    // 3. Loading Collision Ground-Group
    this.groundGroup = this.addGroup('Ground')
    this.groundGroup.setDepth(-1) // so that it remain below graphic and background layer
    
    // 4. Loading Mario + Adding physics-enabled-mario and stoping mario from going out of screen
    this.mario = this.physics.add.sprite(100, 0, 'mario');
    this.mario.body.setCollideWorldBounds(true)
    // 5. Handling Collision Between groundGroup and mario
    this.physics.add.collider(this.mario, this.groundGroup);
    
    // 6. Controling Mario
    this.keyboardCursor = this.input.keyboard.createCursorKeys();
    
    // 7. Mario - Animation
    // Creating Small Mario Animation
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('mario', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('mario', { start: 1, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'forward-jump',
      frames: this.anims.generateFrameNumbers('mario', { start: 5, end: 5}),
      frameRate: 10,
      repeat: -1
    });
    
    // 8. make the camera follow the player
    this.cameras.main.startFollow(this.mario);
    
    // 9. Adding Mario collision with bricks, coins and pipes
    // 9.a. selecting group and setting their depth to -1 
    this.brickGroup = this.addGroup('Bricks'); this.brickGroup.setDepth(-1)
    this.coinGroup = this.addGroup('Coins'); this.coinGroup.setDepth(-1)
    this.pipeGroup = this.addGroup('Pipes'); this.pipeGroup.setDepth(-1)
    
    // 9.b. Adding mario collision
    this.physics.add.collider(this.mario, this.brickGroup);
    this.physics.add.collider(this.mario, this.coinGroup);
    this.physics.add.collider(this.mario, this.pipeGroup);
    
    // Adding Enemies - Goomba, turtle
    this.goombas = []
    this.turtles = []
    

    this.fillEnemyArray('Goombas', 'goomba', this.goombas)
    this.fillEnemyArray('Turtles', 'turtle', this.turtles)
    
    this.keepEnemyOnGround(this.goombas)
    this.keepEnemyOnGround(this.turtles)

    this.collideEnemeyWithPipes(this.goombas)
    this.collideEnemeyWithPipes(this.turtles)

    this.goombas.forEach(enemy => {
      this.physics.add.collider(this.mario, enemy.type)
    })


    this.turtles.forEach(enemy => {
      this.physics.add.collider(this.mario, enemy.type)
    })

    // enemies animation
        // 7. Mario - Animation
    // Creating Small Mario Animation

    this.anims.create({
      key: 'moveTurtle',
      frames: this.anims.generateFrameNumbers('turtle', { start: 0, end: 1}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'deadTurtle',
      frames: this.anims.generateFrameNumbers('turtle', { start: 4, end: 5}),
      frameRate: 10,
      repeat: -1
    });
    


    this.anims.create({
      key: 'moveGoomba',
      frames: this.anims.generateFrameNumbers('goomba', { start: 0, end: 1}),
      frameRate: 10,
      repeat: -1
    });
    

  }
  
  update() {    
    // controlling Mario
    if (this.keyboardCursor.right.isDown && 
      this.keyboardCursor.up.isDown && 
        this.mario.body.touching.down){
      this.mario.anims.play('forward-jump', true);
      
    } else if (this.keyboardCursor.left.isDown) {
      this.mario.setVelocityX(-160);
      this.mario.flipX = true
      this.mario.anims.play('right', true);
      
    } else if (this.keyboardCursor.right.isDown) {
      this.mario.setVelocityX(160);
      this.mario.flipX = false
      this.mario.anims.play('right', true);
    } else {
      this.mario.setVelocityX(0);
      this.mario.anims.play('idle', true);
    }
    
    if (this.keyboardCursor.up.isDown && this.mario.body.touching.down) {
      this.mario.setVelocityY(-200);
    }

    this.moveEnemies()    
  }

  addGroup(layername) {
    // console.log(layername, character)
    const group = this.physics.add.group({
      allowGravity: false,
      immovable: true
    })

    const objects = this.map.getObjectLayer(layername)['objects']

    objects.forEach((object, index) => {
      // character is undefined for bricks , coins , tiles
      group.create(object.x, object.y, object)
      const objectProps = group.children.entries[index]
      objectProps.displayHeight = object.height - 2
      objectProps.displayWidth = object.width
      objectProps.displayOriginX = 0
      objectProps.displayOriginY = 0
    });

    return group
  }
  

  fillEnemyArray (layername, character, enemy_array) {
    const objects = this.map.getObjectLayer(layername)['objects']
    objects.forEach(object => {
      const enemy = this.physics.add.sprite(object.x, object.y, character)
      enemy_array.push({
        type : enemy ,
        velocity : 1.1,
      })
    });
  }

  keepEnemyOnGround(enemy_array) {
    enemy_array.forEach(enemy => {
      this.physics.add.collider(enemy.type, this.groundGroup)
      enemy.type.body.setCollideWorldBounds(true)
    })

  }
  
  moveEnemies() {
    this.goombas.forEach(enemy => {
      enemy.type.anims.play('moveGoomba', true)
      enemy.type.x -= enemy.velocity 
    })

    this.turtles.forEach(enemy => {
      enemy.type.anims.play('moveTurtle', true)
      enemy.type.x -= enemy.velocity 
    })
  }


  collideEnemeyWithPipes(enemy_array) {
    enemy_array.forEach(enemy => {

      this.physics.add.collider(enemy.type, this.pipeGroup, () => {

        enemy.velocity = -1 * enemy.velocity
        if (enemy.type.texture.key == 'turtle' && enemy.velocity > 0 ) {
          enemy.type.flipX = false
        }else{
          enemy.type.flipX = true
        }
      }, null , this)

      // COLLISION WITH GROUND LAYER
      this.physics.add.collider(enemy.type, this.groundGroup, () => {
        enemy.velocity = -1 * enemy.velocity
        if (enemy.type.texture.key == 'turtle' && enemy.velocity > 0 ) {
          enemy.type.flipX = false
        }else{
          enemy.type.flipX = true
        }
      }, null , this)


    })
  }

}

export default GameScene;