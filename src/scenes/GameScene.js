class GameScene extends Phaser.Scene {
  
  constructor () {
    super('game-scene')
  }

  addGroup(layername) {
    const group = this.physics.add.group({ allowGravity: false, immovable: true })
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

  create () {

    // 1. Creating Level
    this.createLevelMap()

    // 2. Loading Background + Collision Ground-Group
    this.backgroundLayer = this.map.createStaticLayer('Background Layer', this.complete_map)
    this.groundGroup = this.addGroup('Ground')
    
    // 3. Loading graphic layer for rest of level-graphics 
    this.graphicLayer = this.map.createDynamicLayer('Graphic Layer', this.complete_map, 0, 0)

    // 4. Laoding Mario + Adding physics-enabled-mario and stoping mario from going out of screen
    this.mario = this.physics.add.sprite(100, 0, 'mario');
    this.mario.setCollideWorldBounds(true)
    
    // 4. colliding groundGroup and mario
    this.physics.add.collider(this.mario, this.groundGroup);
  }

  update () {

  }

  createLevelMap () {
    // 1. Adding tilemap + level1-json to get a LEVEL-map
    // this.cameras.main.setBackgroundColor('#FFF')
    this.map = this.make.tilemap({ key:'level1', tileHeight : 16, tileWidth : 16})
    this.complete_map = this.map.addTilesetImage('tileset_gutter')      
  }
}

export default GameScene;