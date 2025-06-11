class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });

        this.chart = (this.config && config.chart) || "900 - L R - 300 - L R";
    }

    init() {
        this.gameOver = false;
    }

    create() {
        this.lineY = this.game.config.height / 2;
        this.hitZoneX = 375;
        this.noteSpeed = 500; // default speed

        this.perfectZone = 40;
        this.goodZone = 120;
        this.badZone = 960;

        this.spriteSize = 0.5;

        let spacing = 80;

        this.directions = [
            { key: 'LEFT',  char: 'L', sprite: "flatDark_left", color: 0xff4444 },
            { key: 'DOWN',  char: 'D', sprite: "flatDark_down", color: 0x44ff44 },
            { key: 'UP',    char: 'U', sprite: "flatDark_up", color: 0x4444ff },
            { key: 'RIGHT', char: 'R', sprite: "flatDark_right", color: 0xffff44 }
        ];

        this.line = this.add.line(
            0, 0,
            0, this.lineY,
            this.game.config.width, this.lineY,
            0xffffff
        ).setOrigin(0, 0);

        /*
        this.add.rectangle(
            this.hitZoneX, this.lineY, this.badZone, this.game.config.height, 0xffaaaa, 0
        ).setStrokeStyle(2, 0xffaaaa);
        this.add.rectangle(
            this.hitZoneX, this.lineY, this.goodZone, this.game.config.height, 0xffffaa, 0
        ).setStrokeStyle(2, 0xffffaa);
        this.add.rectangle(
            this.hitZoneX, this.lineY, this.perfectZone, this.game.config.height, 0xaaffaa, 0
        ).setStrokeStyle(2, 0xaaffaa);
        */

        this.add.rectangle(
            this.hitZoneX, this.lineY, this.perfectZone, this.game.config.height, 0xffffff, 0.5
        ).setStrokeStyle(2, 0xffffff);

        this.notes = [];
        let chartArr = this.chart.split(/\s+/);
        let startX = this.game.config.width - 50;
        let currentSpeed = this.noteSpeed;

        chartArr.forEach((char, i) => {
            if (char === '-' || char === '') {
                return;
            }
            if (!isNaN(parseFloat(char))) {
                currentSpeed = parseFloat(char);
                return;
            }
            let dir = this.directions.find(d => d.char === char.toUpperCase());
            if (dir) {
                this.notes.push({
                    x: startX + i * spacing,
                    y: this.lineY,
                    dir: dir,
                    active: true,
                    enteredZone: false,
                    speed: currentSpeed,
                    sprite: null
                });
            }
        });

        this.totalNotes = this.notes.length;
        this.score = 0;

        this.input.keyboard.on('keydown', this.handleInput, this);

        // text
        this.feedback = this.add.text(
            this.hitZoneX, this.game.config.height / 3, '',
            { font: '64px Arial', fill: '#fff' }
        ).setOrigin(0.5);

        this.ratingText = this.add.text(
            this.game.config.width / 2, this.lineY + 120, '',
            { font: '32px Arial', fill: '#fff' }
        ).setOrigin(0.5).setVisible(false);

        this.finalMessage = this.add.text(
            this.game.config.width / 2, this.game.config.height / 2 + 100, '',
            { font: '128px Arial', fill: '#fff' }
        ).setOrigin(0.5).setVisible(false);


    }

    handleInput(event) {
        if (this.gameOver) {
            return;
        }
        let key = event.key.replace('Arrow', '').toUpperCase();
        //console.log(event.code + " " + key);
        let dir = this.directions.find(d => d.key === key);
        if (!dir) {
            return;
        }

        let hit = false;
        for (let i = 0; i < this.notes.length; i++) {
            let note = this.notes[i];
            let dist = Math.abs(note.x - this.hitZoneX);
            // Only allow hit if note is in the bad zone
            if (note.active && note.dir.key === key && dist <= this.badZone / 2) {
                note.active = false;
                if (note.sprite) {
                    note.sprite.destroy();
                }
                this.notes.splice(i, 1);

                if (dist <= this.perfectZone / 2) {
                    this.feedback.setText('perfect');
                    this.score += 1;
                } else if (dist <= this.goodZone / 2) {
                    this.feedback.setText('good');
                    this.score += 0.5;
                } else {
                    this.feedback.setText('bad');
                }
                hit = true;
                break;
            }
        }
        if (!hit) {
            this.feedback.setText('miss');
        }
        this.updateRating();
    }

    update(time, delta) {
        if (this.notes.length === 0 && !this.gameOver) {
            this.gameOver = true;
            this.finalMessage.setPosition(this.game.config.width / 2, this.game.config.height / 2 - 50);
            this.ratingText.setPosition(this.game.config.width / 2, this.game.config.height / 2 + 50);
            
            this.finalMessage.setText(`${this.letterGrade}`);

            this.ratingText.setVisible(true);
            this.finalMessage.setVisible(true);

            return;
        }

        for (let i = this.notes.length - 1; i >= 0; i--) {
            let note = this.notes[i];
            if (note.active) {
                let dt = note.speed * (delta / 1000);
                note.x -= dt;
                if (!note.sprite) {
                    note.sprite = this.add.image(note.x, note.y, note.dir.sprite).setScale(this.spriteSize);
                } else {
                    note.sprite.x = note.x;
                }
                if (!note.enteredZone && Math.abs(note.x - this.hitZoneX) <= this.badZone / 2) {
                    note.enteredZone = true;
                }
                if (note.enteredZone && Math.abs(note.x - this.hitZoneX) > this.badZone / 2 && note.x < this.hitZoneX) {
                    note.active = false;
                    if (note.sprite) {
                        note.sprite.destroy();
                    }
                    this.notes.splice(i, 1);
                    this.feedback.setText('miss');
                    this.updateRating();
                }
            }
        }
    }

    updateRating() {
        let playedNotes = this.totalNotes - this.notes.length;
        let accuracy = (playedNotes > 0) ? (this.score / playedNotes) * 100 : 0;
        
        let letterGrade = "F";
        if (accuracy >= 97) {
            letterGrade = "A+";
        } else if (accuracy >= 93) {
            letterGrade = "A";
        } else if (accuracy >= 90) {
            letterGrade = "A-";
        } else if (accuracy >= 87) {
            letterGrade = "B+";
        } else if (accuracy >= 83) {
            letterGrade = "B";
        } else if (accuracy >= 80) {
            letterGrade = "B-";
        } else if (accuracy >= 77) {
            letterGrade = "C+";
        } else if (accuracy >= 73) {
            letterGrade = "C";
        } else if (accuracy >= 70) {
            letterGrade = "C-";
        } else if (accuracy >= 60) {
            letterGrade = "D";
        }

        this.letterGrade = letterGrade;
        this.ratingText.setText(`Accuracy: ${Math.round(accuracy)}% (${letterGrade}) [${this.score} / ${playedNotes}]`);
    }
}