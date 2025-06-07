// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 640,
    height: 480,
    fps: { forceSetTimeOut: true, target: 60 },
    scene: [Game],
    backgroundColor: '#000000'
}

const game = new Phaser.Game(config);