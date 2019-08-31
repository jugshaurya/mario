// In BootScene we are dealing with assets loading to our Game
class BootScene extends Phaser.Scene {

  // For Loading Assets or maybe some Progress Bar
  preload() {
    // Loading Mario Asset
    this.load.spritesheet('mario', './assets/mario_and_enemies/little_mario.png', {
      frameWidth: 16,
      frameHeight: 16,
    })

    this.load.spritesheet('goomba', './assets/mario_and_enemies/goomba.png', {
      frameWidth: 16,
      frameHeight: 16,
    })

    this.load.spritesheet('turtle', './assets/mario_and_enemies/turtle.png', {
      frameWidth: 16,
      frameHeight: 24,
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