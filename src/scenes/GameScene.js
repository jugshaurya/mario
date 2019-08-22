class GameScene extends Phaser.Scene {
  constructor () {
    super('game-scene')
  }

  create () {
    this.add.image(800, 500, 'player')
    console.log('Game-scene Working')
  }

  update () {}

}

export default GameScene;