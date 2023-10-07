import 'phaser';
import Player from './player';


export default class Bullet {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Player} player
     */
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        /////////////////////////////// 

        this.velocity = 20;

        ///////////////////////////////
        
        this.isDestroy = false;
    }

    create() {
        const player_position = this.player.sprite.body.position;
        const player_width = this.player.sprite.body.width;

        let player_gun_x = player_position.x + player_width;
        let player_gun_y = player_position.y + 33;

        this.sprite = this.scene.physics.add.sprite(player_gun_x, player_gun_y, "player_bullet");
            this.sprite.setScale(0.2);
            this.sprite.setDepth(4);
            this.sprite.body.setAllowGravity(false);
            this.sprite.body.setImmovable(true);
            this.sprite.setPipeline('Light2D');

        this.light = this.scene.lights.addLight(player_gun_x, player_gun_y, 50, 0xFFA500, 0.5),

        this.last_x_position = player_gun_x;
    }

    destroy_sprite() {
        this.sprite.destroy();
        this.light.setVisible(false);
        this.isDestroy = true;
    }

    update() {
        if (this.isDestroy)
            return;

        this.sprite.x += this.velocity;
        this.light.x += this.velocity;

        console.log(this.sprite.x)
        
        if (this.sprite.x > this.scene.game.config.width) {
            this.destroy_sprite();
            this.light.setVisible(false);
        }
    }
}