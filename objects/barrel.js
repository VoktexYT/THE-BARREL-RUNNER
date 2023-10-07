import 'phaser';


export default class Barrel {
    /**
     * 
     * @param {Phaser.Scene} scene
     */
    constructor(scene, depth, player) {
        this.scene = scene;
        this.depth = depth;
        this.player_sprite = player.sprite;
        this.player = player;

        this.destroy_barel_time = 200;
        this.y_pos = 350;
        this.is_destroyed = true;

        this.sprite = this.#create_sprite();
    }

    #create_sprite() {
        const barrel = this.scene.physics.add.sprite(0, 0, "barel1");
            barrel.setDepth(this.depth);
            barrel.setOrigin(1, 1);
            barrel.setScale(0.6);
            barrel.body.setAllowGravity(false);
            barrel.body.setImmovable(true);
            barrel.setPipeline('Light2D');

        return barrel;
    }

    enable(index) {
        this.sprite.setPosition((index * 64) - 5, this.y_pos);
        this.sprite.setVisible(true);
        this.is_destroyed = false;
        // this.sprite.body.enable = true;

    }

    disible() {
        // this.sprite.body.enable = false;
        this.sprite.setVisible(false);
        this.is_destroyed = true;
    }
}
