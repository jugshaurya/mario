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

    // controller of Mario
    this.keyboardCursor = this.input.keyboard.createCursorKeys();

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

    // make the camera follow the player
    this.cameras.main.startFollow(this.mario);
  }
  
  update() {    
    // controlling Mario
    if (this.keyboardCursor.right.isDown && 
        this.keyboardCursor.up.isDown && 
        this.mario.body.touching.down)
    {
      console.log('jskdf')
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
      // console.log('sjkd')
      this.mario.setVelocityX(0);
      this.mario.anims.play('idle', true);
    }

    if (this.keyboardCursor.up.isDown && this.mario.body.touching.down) {
      this.mario.setVelocityY(-100);
    }
  }

  addGroup(layername) {
    const group = this.physics.add.group({
      allowGravity: false,
      immovable: true
    })
    const objects = this.map.getObjectLayer(layername)['objects']

    objects.forEach((object, index) => {
      group.create(object.x, object.y, object)
      const objectProps = group.children.entries[index]
      objectProps.displayHeight = object.height
      objectProps.displayWidth = object.width
      objectProps.displayOriginX = 0
      objectProps.displayOriginY = 0
    });

    return group
  }

}

export default GameScene;