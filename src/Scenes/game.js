class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });

        this.chart = (config && config.chart) || "L - R - U - D";
    }

    init() {
        
    }

    create() {
        this.lineY = this.game.config.height / 2;
        this.hitZoneX = 100;
        this.noteSpeed = 200;

        this.perfectZone = 20;
        this.goodZone = 60;
        this.badZone = 120;

        this.directions = [
            { key: 'LEFT',  char: 'L', color: 0xff4444 },
            { key: 'DOWN',  char: 'D', color: 0x44ff44 },
            { key: 'UP',    char: 'U', color: 0x4444ff },
            { key: 'RIGHT', char: 'R', color: 0xffff44 }
        ];

        this.line = this.add.line(
            0, 0,
            0, this.lineY,
            this.game.config.width, this.lineY,
            0xffffff
        ).setOrigin(0, 0);

        this.add.rectangle(
            this.hitZoneX, this.lineY, this.badZone, 480, 0xffaaaa, 0
        ).setStrokeStyle(2, 0xffaaaa);
        this.add.rectangle(
            this.hitZoneX, this.lineY, this.goodZone, 480, 0xffffaa, 0
        ).setStrokeStyle(2, 0xffffaa);
        this.add.rectangle(
            this.hitZoneX, this.lineY, this.perfectZone, 480, 0xaaffaa, 0
        ).setStrokeStyle(2, 0xaaffaa);


        this.notes = [];
        let chartArr = this.chart.split(/\s+/);
        let spacing = 80;
        let startX = this.game.config.width - 50;
        chartArr.forEach((char, i) => {
            if (char === '-' || char === '') {
                return;
            }
            let dir = this.directions.find(d => d.char === char.toUpperCase());
            if (dir) {
                this.notes.push({
                    x: startX + i * spacing,
                    y: this.lineY,
                    dir: dir,
                    active: true,
                    circle: null
                });
            }
        });

        this.input.keyboard.on('keydown', this.handleInput, this);

        this.feedback = this.add.text(
            this.game.config.width / 2, this.lineY + 60, '',
            { font: '24px Arial', fill: '#fff' }
        ).setOrigin(0.5);
    }

    handleInput(event) {
        let key = event.key.replace('Arrow', '').toUpperCase();
        //console.log(event.code + " " + key);
        let dir = this.directions.find(d => d.key === key);
        if (!dir) {
            return;
        }

        let hit = false;
        for (let i = 0; i < this.notes.length; i++) {
            let note = this.notes[i];
            if (note.active && note.dir.key === key) {
                let dist = Math.abs(note.x - this.hitZoneX);
                if (dist <= this.badZone / 2) {
                    note.active = false;
                    if (note.circle) {
                        note.circle.destroy();
                    }

                    this.notes.splice(i, 1);

                    if (dist <= this.perfectZone / 2) {
                        this.feedback.setText('perfect');
                    } else if (dist <= this.goodZone / 2) {
                        this.feedback.setText('good');
                    } else {
                        this.feedback.setText('bad');
                    }
                    hit = true;
                    break;
                }
            }
        }
        if (!hit) {
            this.feedback.setText('miss');
        }
    }

    update(time, delta) {
        let dt = this.noteSpeed * (delta / 1000);
        for (let i = this.notes.length - 1; i >= 0; i--) {
            let note = this.notes[i];
            if (note.active) {
                note.x -= dt;
                if (!note.circle) {
                    note.circle = this.add.circle(note.x, note.y, 15, note.dir.color);
                } else {
                    note.circle.x = note.x;
                }
                if (note.x < 0) {
                    note.active = false;
                    if (note.circle) note.circle.destroy();
                    this.notes.splice(i, 1);
                    this.feedback.setText('miss');
                }
            }
        }
    }
}