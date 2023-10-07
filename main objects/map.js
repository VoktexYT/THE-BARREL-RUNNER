import 'phaser';
import Platform from '../objects/platform';
import Barrel from '../objects/barrel';
import Lava from '../objects/lava';
import randint from '../functions/randint';

// DOC STRING
import Player from '../objects/player';


export default class Map {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Player} player
     * 
     */
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        this.index = 0;
        this.platform_void = 0;

        this.all_sprites_1 = [];
        this.all_sprites_2 = [];

        this.switch_interval = false;
        this.first_map = true;

        ///

        this.number_of_start_platform = 15; // ajust with size of the screen * 2
        this.frequently_void = 5;
        this.frequently_barrel = 5;
        this.velocity = 4;

        ///

        this.#init_all_sprites();
        this.#create();
    }

    #init_all_sprites() {
        for (let i=0; i<this.number_of_start_platform; i++) {
            this.all_sprites_1.push([
                new Platform(this.scene, 1, this.player.sprite),
                new Barrel(this.scene, 2, this.player)
            ]);

            this.all_sprites_2.push([
                new Platform(this.scene, 1, this.player.sprite),
                new Barrel(this.scene, 2, this.player)
            ]);
        }
    }

    #create() {
        this.#create_map(true, true);
        this.#create_map(false, false);
    }

    update() {
        if (this.player.isMiddleScreen) {
            for (let map of [this.all_sprites_1, this.all_sprites_2]) {
                for (let cases of map) {
                    for (let sprite of cases) {
                        sprite.sprite.x -= this.velocity;
                    }
                }
            }

            if (this.all_sprites_1[this.all_sprites_1.length - 1][0].sprite.x <= 0) {
                this.#create_map(false, true);
            }

            if (this.all_sprites_2[this.all_sprites_2.length - 1][0].sprite.x <= 0) {
                this.#create_map(false, false);
            }
        }
    }

    #create_map(is_start, is_all_sprite_1) {
        const struct = this.#create_struct(is_start);
        let all_sprites = [this.all_sprites_1, this.all_sprites_2][Number(!is_all_sprite_1)]
        let index;

        if (this.first_map) {
            index = 0;
            this.first_map = false;
        } else {
            index = this.number_of_start_platform;
        }

        let i = 0;
        

        for (let cases of struct) {
            const [is_platform, is_barrel] = cases;

            if (is_platform) {
                all_sprites[i][0].enable(index);

                if (is_barrel)
                    all_sprites[i][1].enable(index)
                else 
                    all_sprites[i][1].disible(index)
            }

            else
                all_sprites[i][0].disible(index);

            index++;
            i++;
        }
    }


    #create_struct(is_start) {
        let map = [];

        if (!is_start) {
            let number_of_void = 0;
            let number_of_barrel = 0;

            for (let p=0; p<this.number_of_start_platform; p++) {
                let section = [];
                let is_floor = randint(0, this.frequently_void);
                let is_barrel = true;

                if (!is_floor) {
                    if (number_of_void < 2) {
                        number_of_void++;
                    }

                    else {
                        is_floor = true;
                        number_of_void = 0;
                    }
                }
            
                else {
                    if (number_of_barrel < 2) {
                        is_barrel = randint(0, this.frequently_barrel);

                        if (!is_barrel) {
                            number_of_barrel++;
                        }
                    }
                    
                    else {
                        number_of_barrel = 0;
                        is_barrel = true;
                    }
                }

                section.push(Boolean(is_floor));
                section.push(!Boolean(is_barrel));

                map.push(section);
            }
        }

        else {
            for (let p=0; p<this.number_of_start_platform; p++) {
                map.push([true, false]);
            }
        }
        

        return map;
    }
}
