import 'phaser';
import Bullet from './bullet';
import Player from './player';


export default class Input {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {boolean} inversed_input 
     * @param {Player} player 
     */
    constructor(scene, inversed_input, player, all_barrel, score) {
        this.scene = scene;
        this.player = player;
        this.all_barel = all_barrel;
        this.score = score;

        //////////////////////////

        this.inversed_input = false;
        this.dispawn_barel_time = 200;

        ///////////////////////////

        this.all_bullets = [];

        if (inversed_input)
            this.inputs = {"jump": null, "shoot": null};
        else
            this.inputs = {"shoot": null, "jump": null};

        this.#create();
        this.#create_jump_event();
        this.#create_shoot_event();
    }

    #create() {
        const all_input_key = Object.keys(this.inputs);

        for (let key of all_input_key) {
            let value = this.scene.add.rectangle(0, 0, 0, 0, 0xFFFFFF, 0);
                value.width = this.scene.game.config.width / 2;
                value.height = this.scene.game.config.height;
                value.setOrigin(0, 0);
                value.setDepth(10)
                value.setInteractive();
                value.setScrollFactor(0);
            
            if (all_input_key.indexOf(key) === all_input_key.length - 1)
                value.x = this.scene.game.config.width / 2;

            this.inputs[key] = value;
        }
    }

    #create_jump_event() {
        this.inputs.jump.on("pointerdown", () => {
            this.player.jump();
        });
    }

    #create_shoot_event() {
        this.inputs.shoot.on("pointerdown", () => {
            this.scene.fire_sound.play();
            const gun_is_reloaded = this.player.gun_is_reloaded();

            if (gun_is_reloaded) {

                // create new bullet
                const new_bullet = new Bullet(this.scene, this.player);
                
                new_bullet.create();

                this.all_bullets.push(new_bullet);

                this.player.last_time_shoot = new Date();

                //
                for (let barrel of this.all_barel) {
                    const barrel_sprite = barrel.sprite;

                    this.scene.physics.add.collider(barrel_sprite, new_bullet.sprite, () => {
                        if (!new_bullet.isDestroy && !barrel.is_destroyed) {

                            new_bullet.destroy_sprite();

                            barrel_sprite.setTexture("barel2");
                            barrel_sprite.setSize(0, 0);

                            this.score.score_text.text = Number(this.score.score_text.text) + 10;

                            // create short animation after destroy
                            setTimeout(() => {
                                this.scene.explosion_sound.play();
                                barrel.disible();
                                barrel_sprite.setTexture("barel1");
                            }, this.dispawn_barel_time);
                        } 
                    });
                }
            }
        });
    }
}
