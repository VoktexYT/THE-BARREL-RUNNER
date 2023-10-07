import 'phaser';
import Player from '../objects/player';
import Score from '../objects/score';
import Input from '../objects/input';
import Map from '../main objects/map';

export default class Main extends Phaser.Scene {
    constructor() {
        super("main");
    }

    create_object() {
        this.game_loop = true;

        this.background = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x202020);
            this.background.setOrigin(0, 0);
            this.background.setPipeline('Light2D');

        this.player = new Player(this);
        this.score = new Score(this);
        this.map = new Map(this, this.player);
    }

    create_input() {
        this.input_mobile = new Input(this, true, this.player, this.all_barrels, this.score);
    }

    create_cameras() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.cameras.main.setBounds(0, 0);
        this.cameras.main.setBackgroundColor(0x000000);
    }

    get_all_sprites() {
        this.all_barrels = [];
        this.all_platforms = [];

        for (let list of [this.map.all_sprites_1, this.map.all_sprites_2]) {
            for (let cases of list) {
                this.all_platforms.push(cases[0])
                this.all_barrels.push(cases[1])
            }
        }
    }

    update_platform() {
        if (this.player.sprite.y > 310) {
            this.game_loop = false;
            this.player.kill();
        }
    }

    update_barrel() {
        for (let barrel of this.all_barrels) {
            if (this.physics.overlap(barrel.sprite, this.player.sprite)) {
                if (!barrel.is_destroyed) {
                    this.game_loop = false;
                    this.player.kill();
                }
            }
        }
    }

    create() {
        this.lights.enable().setAmbientColor(0x202020);

        this.create_object();
        this.get_all_sprites();
        this.create_input();
        this.create_cameras();

        this.impact_sound = this.sound.add("impact", {loop: false});
        this.fire_sound = this.sound.add("fire", {loop: false, volume: 0.5});
        this.explosion_sound = this.sound.add("explosion", {loop: false, rate: 2});
        this.music_sound = this.sound.add("music", {loop: true, rate: 1, volume: 0.5});
        this.death_sound = this.sound.add("death", {loop: false, rate: 1, volume: 0.3});

        this.music_sound.play()
    }

    update() {
        for (let bullet of this.input_mobile.all_bullets)
            bullet.update();

        this.update_barrel();
        this.update_platform();
        
        if (this.game_loop) {
            this.player.update();
            this.score.update();
            this.map.update();
        }
    }
}