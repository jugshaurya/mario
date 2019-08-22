// In BootScene we are dealing with assets loading to our Game
class BootScene extends Phaser.Scene {

    // For any variables initialization 
    init () {
        this.player = NaN;
    }
    
    // For Loading Assets or maybe some Progress Bar
    preload () {        
        // Laoading Asset
        this.player = this.load.image('player', 'assets/player.png')

        // Passing Scene to GameScreen with data loaded in preloaded
    }

    create(){
        console.log('saf', this.player.displayHeight)
        this.scene.start('game-scene')
    }
}

export default BootScene;