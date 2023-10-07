import 'phaser';


export default class Score {
    constructor(scene) {
        this.scene = scene;
        this.after_time = new Date();

        this.#create_text();
    }

    #create_text() {
        this.score_text = this.scene.add.text(10, 10, "0", {fontSize: 25, fontFamily: "monospace"});
            this.score_text.setDepth(30);
            this.score_text.setScrollFactor(0);
    }

    update() {
        if (new Date() - this.after_time >= 1000) {
            this.after_time = new Date();
            this.score_text.text = Number(this.score_text.text) + 1;
        }
    }
}
