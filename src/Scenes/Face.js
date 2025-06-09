class Face extends Phaser.Scene {
    constructor() {
        super("Face");
    }

    create(){
        this.person = {};
        this.person.body = this.add.sprite(this.game.config.width*2/3, this.game.config.height/2, "body_circle");
        this.person.face = this.add.sprite(this.game.config.width*2/3, this.game.config.height/2, "face_happy");
    }
}