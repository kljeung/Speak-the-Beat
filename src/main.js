
// debug
"use strict"

let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1600,
    height: 900,
    fps: { forceSetTimeOut: true, target: 60},
    scene: [TitleScene, Load, LevelMapCamera, Game, Face, CreditScene],
    backgroundColor: '#000000'
}

const game = new Phaser.Game(config);
