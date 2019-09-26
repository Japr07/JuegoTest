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
        this.dropItem = this.scene.sound.add('LvlUp', {
            loop: false
        });
    };

    ShowStats() {
        let stats = Utilidades.ColocarTexto(this.scene, 0, 0, `Nombre: ${this.texture.key}
Nivel: ${this.nivel}
vida: ${this.vida}/${this.maxVida}
ki: ${this.ki}/${this.maxKi}
fuerza: ${this.fuerza}
defensa: ${this.defensa}
ki Defensa: ${this.kiDefensa}`, 13)
        Utilidades.NuevaVentana(this.scene, stats)
    };

    Moverse() {
        // let isMoving = false
        this.intervaloMoverse = setInterval(() => {
            let dirRandom = Phaser.Math.Between(1, 5);
            this.AnimMover("Quieto");
            switch (dirRandom) {
                case 1:
                    if (this.body.y != 0) {
                        this.AnimMover("Arriba");
                        this.body.setVelocityY(-150);
                    } else {
                        this.AnimMover("Abajo");
                        this.body.setVelocityY(150);
                    }
                    break;
                case 2:
                    if (this.body.y + this.body.height >= this.scene.game.config.height - 10) {
                        this.AnimMover("Arriba");
                        this.body.setVelocityY(-150);
                    } else {
                        this.AnimMover("Abajo");
                        this.body.setVelocityY(150);
                    }
                    break;
                case 3:
                    if (this.body.x != 0) {
                        this.AnimMover("Izquierda");
                        this.body.setVelocityX(-150);
                    } else {
                        this.AnimMover("Derecha");
                        this.body.setVelocityX(150);
                    }
                    break;
                case 4:
                    if (this.body.x + this.body.width >= this.scene.game.config.width - 10) {
                        this.AnimMover("Izquierda");
                        this.body.setVelocityX(-150);
                    } else {
                        this.AnimMover("Derecha");
                        this.body.setVelocityX(150);
                    }
                    break;
                case 5:
                    this.AnimMover("Quieto");
                    this.body.setVelocity(0);
                    break;
            }
        }, 1000);
    };

    DropItem(Player) {
        let droprate = Phaser.Math.Between(0, 4);
        if (droprate == 2) {
            let nombre = Phaser.Math.Between(0, 2);
            let cantidad = Phaser.Math.Between(1, 3);
            switch (nombre) {
                case 0:
                    nombre = 'Pesas';
                    break;
                case 1:
                    nombre = 'Semillas';
                    break;
                case 2:
                    nombre = 'SkillPoints';
                    break;
            }
            this.dropItem.play();
            Player.NuevoItem(nombre, cantidad);
            Utilidades.ColocarTexto(this.scene, Player.body.x + 40, Player.body.y, `${this.texture.key} Dejo Caer ${cantidad} ${nombre}`, 13, 3000)
        }
    }

    takeDamage(Damage, Tipo, Player) {
        if (!this.damageAudio.isPlaying) {
            this.damageAudio.play();
        }
        if (this.vida <= Damage) {
            switch (Tipo) {
                case "fisico":
                    let exp = Math.round(this.exp * (Player.expboost * 5 / 100 + 1));
                    Utilidades.ColocarTexto(this.scene, Player.body.x - 34, Player.body.y, `
                    exp: ${exp}
                    Zenie: ${this.zenie}
                    `, 13, 2000);
                    Player.DarZenie(this.zenie);
                    Player.DarExp(exp);
                    this.DropItem(Player);
                    clearInterval(this.intervaloMoverse);
                    this.destroy();
                    Utilidades.PlayerExpBoost(Player);
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