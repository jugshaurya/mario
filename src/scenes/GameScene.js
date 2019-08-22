class GameScene extends Phaser.Scene {
  constructor () {
    super('game-scene')
  }

  create () {
    this.cameras.main.setBackgroundColor('#FFF')
    this.add.image(800, 500, 'player').setScale(2).setOrigin(0,0)
    console.log('Game-scene Working')
  }

  update () {}

}

export default GameScene;