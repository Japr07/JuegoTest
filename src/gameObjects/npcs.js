import Sprite from './sprite.js';
import Utilidades from '../utils/utilidades.js';

export default class Npcs extends Sprite {
    constructor(scene, x, y, SpriteName, Frame, Nivel = 1) {
        super(scene, x, y, SpriteName, Frame);
        this.nivel = Nivel;
        this.maxVida = (125 * this.nivel) + 1000;
        this.vida = this.maxVida;
        this.maxKi = (75 * this.nivel) + 500;
        this.ki = this.maxKi;
        this.fuerza = (10 * this.nivel) + 100;
        this.defensa = (10 * this.nivel) + 75;
        this.kiDefensa = (25 * this.nivel) + 75;
        this.zenie = (this.nivel * 5) + Phaser.Math.Between(1, 10);
        this.exp = Math.round((this.nivel * 50) + Phaser.Math.Between(1, 10));
        //
        this.damageAudio = this.scene.sound.add('Damage', {
            loop: false,
            delay: 500
        });
    };

    ShowStats() {
        let contenedor = this.scene.add.container(this.scene.game.config.width / 2 - 200, this.scene.game.config.height / 2 - 100);
        let area = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 200, 200)
        let graphics = this.scene.add.graphics({
            fillStyle: {
                color: 0x0000aa
            }
        });
        graphics.fillRectShape(area)
        let stats = Utilidades.ColocarTexto(this.scene, area.x + 80, area.y + 100, `
        Nombre: ${this.texture.key}
        Nivel: ${this.nivel}
        vida: ${this.vida}/${this.maxVida}
        ki: ${this.ki}/${this.maxKi}
        fuerza: ${this.fuerza}
        defensa: ${this.defensa}
        ki Defensa: ${this.kiDefensa}
        `, 13)
        let cerrar = this.scene.add.image(area.x + 200, area.y, 'Cerrar').setAngle(45).setScale(0.6).setInteractive();
        contenedor.add([graphics, stats, cerrar]);
        cerrar.on(Phaser.Input.Events.POINTER_DOWN, () => {
            contenedor.destroy();
        });
    }

    takeDamage(Damage, Tipo, Player) {
        if (!this.damageAudio.isPlaying) {
            this.damageAudio.play();
        }
        if (this.vida <= Damage) {
            switch (Tipo) {
                case "fisico":
                    let exp = this.exp * Player.expboost;
                    Utilidades.ColocarTexto(this.scene, Player.body.x - 34, Player.body.y, `
                    exp: ${exp}
                    Zenie: ${this.zenie}
                    `, 13, 2000);
                    Player.DarZenie(this.zenie);
                    Player.DarExp(exp);
                    this.destroy();
                    break;
                case "ki":
                    break;
                default:
                    break;
            }
        } else {
            this.vida -= Damage;
        }
    }
};