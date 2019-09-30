import Sprite from "../gameObjects/sprite.js";

export default class SelectChara extends Phaser.Scene {
    constructor() {
        super({
            key: 'SelectChara'
        })
    }
    create() {
        this.SelectChara = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'SelectChara').setOrigin(0.5).setScale(1.1);
        this.goku = this.add.sprite(428, 180, 'Goku', 1).setScale(0.5).setInteractive();
        this.gokuAdult = this.add.sprite(464, 180, 'GokuAdultoGT', 1).setScale(0.5).setInteractive();
        this.gokuss = this.add.sprite(428, 216, 'Goku SS', 1).setScale(0.5).setInteractive();
        this.gokuss2 = this.add.sprite(464, 216, 'Goku SS2', 1).setScale(0.5).setInteractive();
        this.gokuss3 = this.add.sprite(428, 248, 'Goku SS3', 1).setScale(0.5).setInteractive();
        this.gokuss4 = this.add.sprite(464, 248, 'Goku SS4', 1).setScale(0.5).setInteractive();
        this.gokuss5 = this.add.sprite(428, 284, 'Goku SS5', 1).setScale(0.5).setInteractive();
        this.aceptar = this.add.rectangle(581, 541, 190, 60).setInteractive().setOrigin(0)
        this.personaje = null;
        this.selectSound = this.sound.add('Select');
        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            if (gameObject.type == 'Rectangle') {
                if (this.personaje == null) {
                    return alert("Seleccione un personaje haciendo click sobre uno.");
                } else {
                    this.scene.stop('SelectChara');
                    this.selectSound.play();
                    return this.scene.start('Juego', this.personaje);
                };
            };
            if (this.animsChara) {
                this.animsChara.destroy(true);
            };
            this.SpriteMuestra(gameObject.texture.key);
            event.stopPropagation();
        });
    };

    SpriteMuestra(spriteKey) {
        this.selectSound.play();
        this.personaje = spriteKey;
        let abajo = this.add.sprite(569, 250, spriteKey, 1).setScale(0.5);
        let derecha = this.add.sprite(569, 285, spriteKey, 7).setScale(0.5);
        let arriba = this.add.sprite(569, 320, spriteKey, 4).setScale(0.5);
        let izquierda = this.add.sprite(569, 355, spriteKey, 10).setScale(0.5);

        let animAbajo = new Sprite(this, 639, 250, spriteKey, 1).setScale(0.5);
        let animDerecha = new Sprite(this, 639, 285, spriteKey, 1).setScale(0.5);
        let animArriba = new Sprite(this, 639, 320, spriteKey, 1).setScale(0.5);
        let animIzquierda = new Sprite(this, 639, 355, spriteKey, 1).setScale(0.5);
        animAbajo.AnimMover('Abajo');
        animDerecha.AnimMover('Derecha');
        animArriba.AnimMover('Arriba');
        animIzquierda.AnimMover('Izquierda');

        let golpeAbajo = new Sprite(this, 675, 250, spriteKey, 1).setScale(0.5);
        let golpeDerecha = new Sprite(this, 675, 285, spriteKey, 1).setScale(0.5);
        let golpeArriba = new Sprite(this, 675, 320, spriteKey, 1).setScale(0.5);
        let golpeIzquierda = new Sprite(this, 675, 355, spriteKey, 1).setScale(0.5);
        golpeAbajo.AnimPunch('Abajo');
        golpeAbajo.anims.setRepeat(-1);
        golpeAbajo.anims.setRepeatDelay(150);
        golpeDerecha.AnimPunch('Derecha');
        golpeDerecha.anims.setRepeat(-1);
        golpeDerecha.anims.setRepeatDelay(150);
        golpeArriba.AnimPunch('Arriba');
        golpeArriba.anims.setRepeat(-1);
        golpeArriba.anims.setRepeatDelay(150);
        golpeIzquierda.AnimPunch('Izquierda');
        golpeIzquierda.anims.setRepeat(-1);
        golpeIzquierda.anims.setRepeatDelay(150);
        this.animsChara = this.add.group([golpeIzquierda, golpeArriba, golpeDerecha, golpeAbajo, abajo, derecha, arriba, izquierda, animAbajo, animArriba, animDerecha, animIzquierda]);
    };
};