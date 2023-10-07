import 'phaser';


export default class Player {
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        this.scene = scene;

        ///////////////////////////////

        this.velovity = 200;
        this.jump_power = 800;
        this.reload_gun_time = 200;
        this.light_color = 0xFF0000;

        ////////////////////////////////

        this.default_postion = [100, 100];
        this.last_time_shoot = new Date();
        this.isGround = false;
        this.isDeath = false;
        this.isMiddleScreen = false;
        
        this.#create_anims();
        this.sprite = this.#create_sprite();
    }

    gun_is_reloaded() {
        return new Date() - this.last_time_shoot > this.reload_gun_time;
    }

    update() {
        if (!this.isDeath) {
            this.isGround = this.sprite.body.blocked.down;
            this.move();
            this.light[0].x = this.sprite.x;
            this.light[0].y = this.sprite.y - 30;
            this.light[1].x = this.sprite.x - 5;
            this.light[1].y = this.sprite.y + 40;
        }

        this.isMiddleScreen = this.sprite.x >= this.scene.game.config.width / 2;
    }

    #play_anims(name) {
        if (!name) {
            this.sprite.anims.stop();
            this.sprite.setTexture("player_black_iddle", 0);
        }

        else if (!this.sprite.anims.isPlaying)
            this.sprite.anims.play("player:" + name);
    }

    #create_anims() {
        this.scene.anims.create({
            key: 'player:iddle',
            frames: 'player_black_iddle',
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'player:run',
            frames: 'player_black_run',
            frameRate: 13,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'player:jump',
            frames: 'player_black_jump',
            frameRate: 7,
            repeat: -1
        });
    }

    #create_sprite() {
        let sprite = this.scene.physics.add.sprite(this.default_postion[0], this.default_postion[1], "player_black_iddle", 0);
            sprite.setScale(0.6);
            sprite.setGravityY(100);
            sprite.setSize(50, 150);
            sprite.setDepth(5);
            // sprite.setTint(0x404040)
            this.light = [
                this.scene.lights.addLight(0, 0, 50, this.light_color, 0.5),
                this.scene.lights.addLight(0, 0, 50, this.light_color, 0.1)
            ]

            sprite.setPipeline('Light2D');

        return sprite;
    }

    #move_animation() {
        if (this.sprite.anims.isPlaying) {
            if (this.isGround) {
                if (this.sprite.anims.currentAnim.key != "player:run") {
                    this.#play_anims(false);
                    this.scene.impact_sound.play();
                    this.scene.cameras.main.shake(200, 0.01);
                }
                this.#play_anims("run");
            }

            else {
                if (this.sprite.anims.currentAnim.key != "player:jump") {
                    this.#play_anims(false);
                }
                this.#play_anims("jump");
            }
        }


        if (!this.isGround) {
            if (this.sprite.anims.isPlaying && this.sprite.anims.currentAnim.key != "player:jump") {
                this.#play_anims(false);
                // this.scene.cameras.main.shake(300, 0.01);
            }
            this.#play_anims("jump");
        }
    }

    jump() {
        if (this.isGround) {
            this.sprite.setVelocityY(-this.jump_power)
        }

    }

    move() {
        this.sprite.setVelocityX(this.velovity * !this.isMiddleScreen);
        this.#move_animation();
    }

    kill() {
        if (!this.isDeath) {
            this.scene.death_sound.play();
            this.isDeath = true;
            this.scene.cameras.main.fadeOut(1000, 0, 0, 0);
            this.scene.cameras.main.on("camerafadeoutcomplete", () => {
                this.scene.scene.restart();
            });
        }
    }
}