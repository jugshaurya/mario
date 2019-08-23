// In BootScene we are dealing with assets loading to our Game
class BootScene extends Phaser.Scene {

  // For Loading Assets or maybe some Progress Bar
  preload() {
    // Laoading Asset
    this.player = this.load.image('player', 'assets/player.png')
  }

  create() {
    // Passing Scene to GameScreen with data loaded in preloaded
    this.scene.start('game-scene')
  }
}

export default BootScene;