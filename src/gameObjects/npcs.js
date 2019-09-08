import Sprite from './sprite.js';

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
        this.escena = scene;
        this.setScale(2);
    };
    takeDamage(Damage, Player) {
        this.vida -= Damage;
        if (this.vida <= Damage) {
            let exp = this.exp * Player.expboost;
            let showExp = this.scene.add.text(Player.body.x + 25, Player.body.y - 10, `exp: ${exp}`, {
                fontFamily: 'Verdana',
                fontSize: '12px',
                color: 'red'
            }).setOrigin(0.5, 0.5);
            let showZenie = this.scene.add.text(Player.body.x + 25, Player.body.y, `Zenie: ${this.zenie}`, {
                fontFamily: 'Verdana',
                fontSize: '12px',
                color: 'red'
            }).setOrigin(0.5, 0.5);
            setTimeout(() => {
                showZenie.destroy();
                showExp.destroy();
            }, 2000);
            Player.DarExp(exp);
            Player.DarZenie(this.zenie);
            this.destroy();
        }
    }
};
export default Npcs;