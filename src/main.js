//imports the camera scroll so it runs on main
import LevelMapCamera from './Scenes/LevelMapCamera.js';

// debug
"use strict"

let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 640,
    height: 480,
    fps: { forceSetTimeOut: true, target: 60},
    scene: [Load, LevelMapCamera, Game, Face],
    backgroundColor: '#000000'
}

const game = new Phaser.Game(config);