class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    init() {
        
    }

    create() {
        this.lineY = this.game.config.height / 2;

        this.hitZoneX = 100;

        this.line = this.add.line(
            0, 0,
            0, this.lineY,
            this.game.config.width, this.lineY,
            0xffffff
        ).setOrigin(0, 0);

        this.hitZone = this.add.rectangle(
            this.hitZoneX, this.lineY, 20, 600, 0xffffff, 0
        ).setStrokeStyle(2, 0xffffff);

        this.noteSpeed = 200;
        this.noteActive = true;
        this.note = this.add.circle(
            this.game.config.width - 50, this.lineY, 15, 0xffffff
        );

        this.input.keyboard.on('keydown-SPACE', this.handleInput, this);

        this.feedback = this.add.text(
            this.game.config.width / 2, this.lineY + 60, '',
            { font: '24px Arial', fill: '#fff' }
        ).setOrigin(0.5);
    }

    handleInput() {
        if (!this.noteActive) return;

        if (Math.abs(this.note.x - this.hitZoneX) < 20) {
            this.feedback.setText('good');
            this.noteActive = false;
            this.note.setFillStyle(0x888888);
        } else {
            this.feedback.setText('miss');
        }
    }

    update(time, delta) {
        if (this.noteActive) {
            this.note.x -= this.noteSpeed * (delta / 1000);

            if (this.note.x < this.hitZoneX - 20) {
                this.noteActive = false;
                this.feedback.setText('miss');
                this.note.setFillStyle(0x888888);
            }
        }
    }
}