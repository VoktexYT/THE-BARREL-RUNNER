import 'phaser';
import Main from '../scenes/main';
import Preload from '../scenes/preload';
import Start from '../scenes/start';

const config = {
    type: Phaser.AUTO,

    width: 896,
    height: 414,

    // scene: [Preload, Main],
    scene: [Start, Preload, Main],

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    physics:{
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 2000}
        }
    }
};

const game = new Phaser.Game(config);

