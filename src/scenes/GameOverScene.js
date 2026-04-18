class GameOverScene extends Phaser.Scene {
  constructor() {
    super('gameover-scene');
  }

  create() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;
    this.cameras.main.setBackgroundColor('#000000');
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.add.text(w / 2, h / 2 - 30, 'GAME OVER', {
      fontFamily: '"Press Start 2P"',
      fontSize: '32px',
      fill: '#ffffff',
    }).setOrigin(0.5);

    const restartText = this.add.text(w / 2, h / 2 + 30, 'PRESS ENTER TO RETRY', {
      fontFamily: '"Press Start 2P"',
      fontSize: '14px',
      fill: '#aaaaaa',
    }).setOrigin(0.5);

    this.tweens.add({
      targets: restartText,
      alpha: 0,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });

    this.time.delayedCall(1000, () => {
      this.input.keyboard.once('keydown-ENTER', () => this.restart());
      this.input.keyboard.once('keydown-SPACE', () => this.restart());
    });
  }

  restart() {
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.time.delayedCall(300, () => {
      const hud = this.scene.get('hud-scene');
      hud.reset();
      this.scene.stop('hud-scene');
      this.scene.start('game-scene');
    });
  }
}

export default GameOverScene;
