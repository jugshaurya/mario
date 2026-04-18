class BootScene extends Phaser.Scene {
  constructor() {
    super('boot-scene');
  }

  preload() {
    // Loading bar
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 80, height / 2 - 6, 160, 12);

    const loadingText = this.add.text(width / 2, height / 2 - 20, 'LOADING...', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
      fill: '#ffffff',
    });
    loadingText.setOrigin(0.5);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xe86a17, 1);
      progressBar.fillRect(width / 2 - 78, height / 2 - 4, 156 * value, 8);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // Spritesheets
    this.load.spritesheet('mario', './assets/mario_and_enemies/little_mario.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('goomba', './assets/mario_and_enemies/goomba.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('turtle', './assets/mario_and_enemies/turtle.png', {
      frameWidth: 16,
      frameHeight: 24,
    });

    // Tilemap
    this.load.image('tileset_gutter', './assets/tileset_gutter.png');
    this.load.tilemapTiledJSON('level1', './assets/mariolevel1.json');
  }

  create() {
    this.createAnimations();
    this.scene.start('title-scene');
  }

  createAnimations() {
    // Mario animations
    this.anims.create({
      key: 'mario-idle',
      frames: this.anims.generateFrameNumbers('mario', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'mario-run',
      frames: this.anims.generateFrameNumbers('mario', { start: 1, end: 3 }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: 'mario-jump',
      frames: this.anims.generateFrameNumbers('mario', { start: 5, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'mario-death',
      frames: this.anims.generateFrameNumbers('mario', { start: 6, end: 6 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: 'mario-skid',
      frames: this.anims.generateFrameNumbers('mario', { start: 4, end: 4 }),
      frameRate: 10,
      repeat: 0,
    });

    // Enemy animations
    this.anims.create({
      key: 'goomba-walk',
      frames: this.anims.generateFrameNumbers('goomba', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'goomba-death',
      frames: this.anims.generateFrameNumbers('goomba', { start: 2, end: 2 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: 'turtle-walk',
      frames: this.anims.generateFrameNumbers('turtle', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'turtle-shell',
      frames: this.anims.generateFrameNumbers('turtle', { start: 4, end: 4 }),
      frameRate: 10,
      repeat: 0,
    });
  }
}

export default BootScene;
