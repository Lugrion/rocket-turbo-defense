import { Boot } from './scenes/Boot';
import { MainRunner } from './scenes/MainRunner';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    parent: 'game-container',
    backgroundColor: '#125555',
    pixelArt: true, 
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainRunner,
        GameOver
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                y: 0,
                x: 0
            },
            debug: false
        }
    }
};

export default new Game(config);
