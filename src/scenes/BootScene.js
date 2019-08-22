// In BootScene we are dealing with assets loading to our Game
class BootScene extends Phaser.Scene {

    // For any variables initialization 
    init () {}
    
    // For Loading Assets or maybe some Progress Bar
    preload () {        
        // Laoading Asset
        this.load.image('player', 'assets/player.png')

        // Passing Scene to GameScreen with data loaded in preloaded
    }

    create(){
        this.scene.start('game-scene')
    }
}

export default BootScene;