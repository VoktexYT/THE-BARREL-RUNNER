import 'phaser';


export default class Lava {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {*} depth_back 
     * @param {*} depth_front 
     */
    constructor(scene, depth_back, depth_front) {
        this.scene = scene;
        this.depth_back = depth_back;
        this.depth_front = depth_front;

        this.y_pos = 350;
    }

    create(index) {
        const sprites = [
            this.scene.physics.add.sprite((index - 1) * 64, this.y_pos - 25, "water", 0),
            this.scene.physics.add.sprite((index - 1) * 64, this.y_pos, "water", 0)
        ];

        for (let l of sprites) {
            l.setScale(0.4);
            l.setOrigin(0, 0);
            l.body.setImmovable(true)
            l.body.setAllowGravity(false);
            l.setTint(0xFF2000);
            l.setSize(l.width, 10)
            l.setDebugBodyColor(0x0000FF)
        }

        sprites[0].setDepth(this.depth_back);
        sprites[1].setDepth(this.depth_front);

        return sprites;
    }
}