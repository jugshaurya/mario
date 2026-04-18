class HUDScene extends Phaser.Scene {
  constructor() {
    super('hud-scene');
    this.score = 0;
    this.coins = 0;
    this.lives = 3;
    this.time_remaining = 400;
  }

  create() {
    const w = this.cameras.main.width;
    const fontSize = '14px';
    const textStyle = {
      fontFamily: '"Press Start 2P"',
      fontSize,
      fill: '#ffffff',
    };

    const spacing = w / 5;

    // MARIO + score
    this.add.text(spacing * 0.5, 12, 'MARIO', textStyle).setOrigin(0.5, 0);
    this.scoreText = this.add.text(spacing * 0.5, 28, '000000', textStyle).setOrigin(0.5, 0);

    // Coins
    this.add.text(spacing * 1.5, 12, 'COINS', textStyle).setOrigin(0.5, 0);
    this.coinText = this.add.text(spacing * 1.5, 28, '×00', textStyle).setOrigin(0.5, 0);

    // WORLD
    this.add.text(spacing * 2.5, 12, 'WORLD', textStyle).setOrigin(0.5, 0);
    this.add.text(spacing * 2.5, 28, '1-1', textStyle).setOrigin(0.5, 0);

    // LIVES
    this.add.text(spacing * 3.5, 12, 'LIVES', textStyle).setOrigin(0.5, 0);
    this.livesText = this.add.text(spacing * 3.5, 28, '♥♥♥', {
      ...textStyle,
      fill: '#ff4444',
    }).setOrigin(0.5, 0);

    // TIME
    this.add.text(spacing * 4.5, 12, 'TIME', textStyle).setOrigin(0.5, 0);
    this.timeText = this.add.text(spacing * 4.5, 28, '400', textStyle).setOrigin(0.5, 0);

    // Timer countdown
    this.timerEvent = this.time.addEvent({
      delay: 400,
      callback: this.tickTimer,
      callbackScope: this,
      loop: true,
    });

    // Listen for game events
    const gameScene = this.scene.get('game-scene');

    gameScene.events.on('add-score', (points) => {
      this.score += points;
      this.scoreText.setText(String(this.score).padStart(6, '0'));
    });

    gameScene.events.on('add-coin', () => {
      this.coins++;
      this.coinText.setText('×' + String(this.coins).padStart(2, '0'));
      this.score += 200;
      this.scoreText.setText(String(this.score).padStart(6, '0'));
    });

    gameScene.events.on('lose-life', () => {
      this.lives--;
      this.livesText.setText('♥'.repeat(Math.max(0, this.lives)));
    });

    gameScene.events.on('get-lives', (callback) => {
      callback(this.lives);
    });

    gameScene.events.on('reset-timer', () => {
      this.time_remaining = 400;
      this.timeText.setFill('#ffffff');
    });
  }

  tickTimer() {
    if (this.time_remaining > 0) {
      this.time_remaining--;
      this.timeText.setText(String(this.time_remaining));

      if (this.time_remaining <= 100) {
        this.timeText.setFill('#ff4444');
      }

      if (this.time_remaining === 0) {
        const gameScene = this.scene.get('game-scene');
        gameScene.events.emit('time-up');
      }
    }
  }

  reset() {
    this.score = 0;
    this.coins = 0;
    this.lives = 3;
    this.time_remaining = 400;
  }
}

export default HUDScene;
