import './style.css';
import Phaser from 'phaser';
import BootScene from './scenes/BootScene';

const canvas = document.getElementById('game-canvas');
const config = {
    type   : Phaser.AUTO,
    width  : window.innerWidth,
    height : window.innerHeight-5,
    parent: canvas,
    scene: [
        BootScene,
    ]
};

const game  = new Phaser.Game(config);