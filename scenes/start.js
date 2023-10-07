import 'phaser';


export default class Start extends Phaser.Scene {
    constructor() {
        super("start");
    }

    preload() {
        this.load.image("background", "./static/Background/Background.png");
        this.load.image("title", "./static/Tilesets/title6.png");
    }

    create() {
        const bg = this.add.image(0, -105, "background").setOrigin(0, 0).setScale(1.6).setInteractive().setAlpha(0.5);
            bg.setTint(0xF00000);

        const title = this.add.image(this.game.config.width/2, 100, "title").setAlpha(1).setScale(0.6).setOrigin(.5, 0).setInteractive();
        
        const text = this.add.text(this.game.config.width/2, 300, "tap on screen...", {
            fontSize: 25, fontFamily: "monospace"
        }).setOrigin(0.5, 0).setInteractive();

        setInterval(() => {
            this.add.tween({
                targets: text,
                alpha: 0,
                duration: 300,
    
                onComplete: () => {
                    this.add.tween({
                        targets: text,
                        alpha: 1,
                        duration: 300
                    });
                }
            });
        }, 700);
        

        for (let el of [bg, title]) {
            el.on("pointerdown", () => {
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.on("camerafadeoutcomplete", () => {
                    this.scene.start("preload");
                });
            });
        }


    }
}