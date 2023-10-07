import 'phaser';


export default class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {
        this.load.image("platform", "./static/Tilesets/platform.png");
        this.load.image("barel1", "./static/Tilesets/barel.png");
        this.load.image("barel2", "./static/Tilesets/barel2.png");
        this.load.image("player_bullet", "./static/Characters/Black/bullet2.png");

        this.load.spritesheet("water", "./static/Tilesets/water.png", {
            frameWidth: 160,
            frameHeight: 160
        });

        this.load.spritesheet("player_black_iddle", "./static/Characters/Black/Gunner_Black_Idle.png", {
            frameWidth: 240,
            frameHeight: 240
        });

        this.load.spritesheet("player_black_run", "./static/Characters/Black/Gunner_Black_Run.png", {
            frameWidth: 240,
            frameHeight: 240
        });

        this.load.spritesheet("player_black_jump", "./static/Characters/Black/Gunner_Black_Jump.png", {
            frameWidth: 240,
            frameHeight: 240
        });

        this.load.audio("impact", "./static/Sound/impact.mp3");
        this.load.audio("fire", "./static/Sound/fire.mp3");
        this.load.audio("explosion", "./static/Sound/explosion.mp3");
        this.load.audio("walk", "./static/Sound/walk.mp3");
        this.load.audio("music", "./static/Sound/music.mp3");
        this.load.audio("death", "./static/Sound/death.mp3");
    }

    create() {
        this.scene.start("main");
    }
}