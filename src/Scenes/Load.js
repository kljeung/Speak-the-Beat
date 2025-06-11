class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");

        /* TO-DO:
         - load sfx audio
         - load song audio
         - load faces
         - load animations, if any
        */
    }

    preload() {
        this.load.setPath("./assets/");

        // load faces
        this.load.image("face_happy", "face_a.png");
        this.load.image("face_mad", "face_b.png");
        this.load.image("face_sad", "face_c.png");
        this.load.image("body_circle", "yellow_body_circle.png");
        this.load.image("body_squircle", "yellow_body_squircle.png");

        // load basic emotes
        this.load.image("text_bubble", "emote_.png");
        this.load.image("emote_alert", "emote_alert.png");
        this.load.image("emote_anger", "emote_anger.png");
        this.load.image("emote_dots3", "emote_dots3.png");
        this.load.image("emote_drops", "emote_drops.png");
        this.load.image("emote_exclamations", "emote_exclamations.png");
        this.load.image("emote_faceAngry", "emote_faceAngry.png");
        this.load.image("emote_faceSad", "emote_faceSad.png");
        this.load.image("emote_heart", "emote_heart.png");
        this.load.image("emote_heartBroken", "emote_heartBroken.png");
        this.load.image("emote_question", "emote_question.png");

        // load buttons
        this.load.image("flatDark_left", "flatDark_left.png");
        this.load.image("flatDark_right", "flatDark_right.png");
        this.load.image("flatDark_up", "flatDark_up.png");
        this.load.image("flatDark_down", "flatDark_down.png");
        this.load.image("flatDark_menu", "flatDark_menu.png");
        this.load.image("flatDark_pause", "flatDark_pause.png");
        this.load.image("flatDark_select", "flatDark_select.png");
        this.load.image("flatDark_start", "flatDark_start.png");
        this.load.image("flatDark_config", "flatDark_config.png");
        this.load.image("flatDark_options", "flatDark_options.png");
        this.load.image("flatDark_exit", "flatDark_exit.png");
        this.load.image("flatDark_musicOff", "flatDark_musicOff.png");
        this.load.image("flatDark_musicOn", "flatDark_musicOn.png");
        this.load.image("flatDark_no", "flatDark_no.png");
        this.load.image("flatDark_yes", "flatDark_yes.png");
        this.load.image("flatDark_star", "flatDark_star.png");
        this.load.image("flatDark_volOn", "flatDark_volOn.png");
        this.load.image("flatDark_volOff", "flatDark_volOff.png");

        // load tilemap
        this.load.tilemapTiledJSON("levelMap", "levelMap.json");
        this.load.image("tiles", "tilemap_packed.png");

        // load custom font if we want one
        //this.load.bitmapFont("font", "font.png", "font.xml");

        // load audio once we have one
        /*
        this.load.audio("key", "path.mp3");
        */
        
    }

    create() {
        // load animations if we decide to use them
        /*
        this.anims.create({
            key: 'key',
            frames: [{key: "heart_1", frame: 0, duration: 1100},
                     {key: "heart_2", frame: 0, duration: 600}],
            repeat: -1
        });
        */

         console.log("preload done");
         console.log("start game");
         
         // start the game (can use to test the scene we are working on)
         this.scene.start("LevelMapCamera");
    }
}