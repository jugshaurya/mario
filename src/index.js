import Phaser from 'phaser';
import './style.css';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';

const canvas = document.getElementById('game-canvas');
const config = {
    type   : Phaser.AUTO,
    width  : window.innerWidth - 5,
    height : window.innerHeight - 5,
    parent: canvas,
    scene: [ 
        BootScene,
        GameScene,
    ]
};

const game  = new Phaser.Game(config);