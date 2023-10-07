import 'phaser';


export default class Platform {
    /**
     * 
     * @param {Phaser.Scene} scene
     */
    constructor(scene, depth, player_sprite) {
        this.scene = scene;
        this.depth = depth;
        this.player_sprite = player_sprite;

        this.y_pos = 385;

        this.sprite = this.#create_sprite();
    }

    #create_sprite() {
        const platform = this.scene.physics.add.sprite(0, 0, "platform");
            platform.setScale(0.2);
            platform.setDepth(this.depth);
            platform.setOrigin(1, 1);
            platform.body.setAllowGravity(false);
            platform.body.setImmovable(true);
            platform.setDebugBodyColor(0x00FF00);
            platform.setSize(platform.width, 10);
            platform.setPipeline('Light2D');
        
        this.scene.physics.add.collider(this.player_sprite, platform);

        return platform;
    }

    enable(index) {
        this.sprite.setPosition(index * 64, this.y_pos);
        this.sprite.setActive(true);
        this.sprite.setVisible(true);
        this.sprite.body.enable = true;
    }

    disible(index) {
        this.sprite.setPosition(index * 64, this.y_pos);
        this.sprite.setVisible(false);
        this.sprite.body.enable = false;
    }
}
