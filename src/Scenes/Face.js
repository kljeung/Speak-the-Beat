class Face extends Phaser.Scene {
    constructor() {
        super("Face");
    }

    /* TO-DO:
        - add message box

    */

    create(){
        this.person = {};
        this.person.body = this.add.sprite(this.game.config.width*2/3, this.game.config.height/2, "body_circle");
        this.person.face = this.add.sprite(this.game.config.width*2/3, this.game.config.height/2, "face_happy");
        this.bubble = this.add.sprite(this.person.body.x, this.person.body.y-150, "text_bubble").setScale(10);
        this.bubble.visible = false;
        this.dialogue = ["Since we're walking to Safeway,                do you      want anything?",
                         "          ",
                         "Apples sound good.",
                         "      ",
                         "Can you "];
        this.message = this.make.text({x: this.person.body.x - (this.person.body.width/2 - 10),
                                       y: this.person.body.y-210,
                                       text: '',
                                        style: {
                                            font: 'bold 18px Arial',
                                            fill: 'black',
                                            //align: 'center',
                                            wordWrap: {width: 170, useAdvancedWrap: true}
                                        }});
        this.typewriteText(this.dialogue[0], 0);
    }

    update(){
        
    }

    typewriteText(text, num){
        console.log("(typewrite)\n", text);
        let play = text.trim().length;
        if(play){
            this.bubble.visible = true;
        }
        const length = text.length;
        let i = 0;
        this.time.addEvent({
            callback: () => {
                this.message.text += text[i];
                ++i;
            },
            repeat: length - 1,
            delay: 50
        });
        this.time.addEvent({
            callback: () => {
                this.bubble.visible = false;
                this.message.text = '';
                this.typewriteText(this.dialogue[num+1], num+1);
            },
            delay: 5000
        });
    }

}