class Face extends Phaser.Scene {
    constructor() {
        super("Face");
    }

    /* TO-DO:
        - finish dialogue
        - add player dialogue

    */

    create(){
        this.person = {};
        this.person.body = this.add.sprite(this.game.config.width*2/3, this.game.config.height/2, "body_circle");
        this.person.face = this.add.sprite(this.game.config.width*2/3, this.game.config.height/2, "face_happy");
        this.bubble = this.add.sprite(this.person.body.x, this.person.body.y-200, "text_bubble").setScale(10);
        this.bubble.visible = false;
        this.dialogue = ["Since we're walking to Safeway,                do you      want anything?",
                         " ",  // indicates pause
                         "Apples sound good.",
                         "I'm buying the steak for dinner tonight.",
                         "By the way, how did your report card come out?",
                         " ",  // indicates pause
                         "3 Bs, 3 As? Only?",
                         "Angry",  // changes face to angry
                         "You're a disappointment.",
                         "Sad",  // changes face to sad
                         "Well, what did I expect. You failed both of your AP exams last year.",
                         "Happy",  // changes face to happy
                         "Oh, we're here! Let's go get your apples."
                        ];
        this.message = this.make.text({x: this.person.body.x - (this.person.body.width/2 - 10),
                                       y: this.person.body.y-250,
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
        console.log(text);
        let play = text.trim().length;
        if(play){
            this.bubble.visible = true;
        }
        if(text == "Happy"){
            this.person.face.destroy();
            this.person.face = this.add.sprite(this.game.config.width*2/3, this.game.config.height/2, "face_happy");
            this.typewriteText(this.dialogue[num+1], num+1);
            return;
        }
        else if(text == "Angry"){
            this.person.face.destroy();
            this.person.face = this.add.sprite(this.game.config.width*2/3, this.game.config.height/2, "face_mad");
            this.typewriteText(this.dialogue[num+1], num+1);
            return;
        }
        else if(text == "Sad"){
            this.person.face.destroy();
            this.person.face = this.add.sprite(this.game.config.width*2/3, this.game.config.height/2, "face_sad");
            this.typewriteText(this.dialogue[num+1], num+1);
            return;
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