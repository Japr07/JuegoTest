import Sprite from './sprite.js';
import Utilidades from '../utils/utilidades.js';

class Npcs extends Sprite {
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
    };

    Ataque(Player) {

    }

    takeDamage(Damage, Tipo, Player) {
        this.vida -= Damage;
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
                    Player.ActualizarStats(this.scene);
                    this.destroy();
                    break;
                case "ki":
                    break;
                default:
                    break;
            }
        }
    }
};
export default Npcs;