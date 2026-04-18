class TitleScene extends Phaser.Scene {
  constructor() {
    super('title-scene');
  }

  create() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;
    this.cameras.main.setBackgroundColor('#6b8cff');

    // Title
    this.add.text(w / 2, h * 0.25, 'SUPER', {
      fontFamily: '"Press Start 2P"',
      fontSize: '32px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.text(w / 2, h * 0.25 + 40, 'MARIO BROS', {
      fontFamily: '"Press Start 2P"',
      fontSize: '32px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // Mario sprite
    const mario = this.add.sprite(w / 2, h * 0.52, 'mario', 0);
    mario.setScale(4);

    // Copyright
    this.add.text(w / 2, h * 0.62, '© SHAURYA', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      fill: '#ffffff',
    }).setOrigin(0.5);

    // Blinking "PRESS ENTER"
    const pressText = this.add.text(w / 2, h * 0.78, 'PRESS ENTER', {
      fontFamily: '"Press Start 2P"',
      fontSize: '16px',
      fill: '#ffffff',
    }).setOrigin(0.5);

    this.tweens.add({
      targets: pressText,
      alpha: 0,
      duration: 500,
      ease: 'Power2',
      yoyo: true,
      repeat: -1,
    });

    // Controls hint
    this.add.text(w / 2, h * 0.88, 'ARROWS / WASD: MOVE    UP / W: JUMP', {
      fontFamily: '"Press Start 2P"',
      fontSize: '10px',
      fill: '#aaaaaa',
    }).setOrigin(0.5);

    // Input
    this.input.keyboard.once('keydown-ENTER', () => this.startGame());
    this.input.keyboard.once('keydown-SPACE', () => this.startGame());

    this.cameras.main.fadeIn(500, 0, 0, 0);
  }

  startGame() {
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.time.delayedCall(300, () => {
      this.scene.start('game-scene');
    });
  }
}

export default TitleScene;
