// In BootScene we are dealing with assets loading to our Game
class BootScene extends Phaser.Scene {

  // For Loading Assets or maybe some Progress Bar
  preload() {
    // Loading Mario Asset
    this.load.spritesheet('mario', './assets/mario-sprites.png', {
      frameWidth: 16,
      frameHeight: 32,
    })

    // Loading Level-files (tilemap image + json File)
    this.load.image('tileset_gutter', './assets/tileset_gutter.png')
    this.load.tilemapTiledJSON('level1', './assets/mariolevel1.json')
  }

  create() {
    // Passing Scene to GameScreen with data loaded in preloaded
    this.scene.start('game-scene')
  }
}

export default BootScene;