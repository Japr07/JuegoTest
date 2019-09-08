import Sprite from "./sprite.js";

class Player extends Sprite {
    constructor(scene, x, y, SpriteName, Frame) {
        super(scene, x, y, SpriteName, Frame);
        this.nivel = 1;
        this.nivelPrev = this.nivel;
        this.maxVida = 1000;
        this.vida = this.maxVida;
        this.maxKi = 500;
        this.ki = this.maxKi;
        this.fuerza = 100;
        this.defensa = 75;
        this.kiDefensa = 75;
        this.statsPoints = 0;
        this.zenie = 0;
        this.exp = 0;
        this.nexp = 1000;
        this.bonusNivel = 0;
        this.expboost = 1;
        this.inventario = [];
        this.velPuno = 2000;
        this.maxCombo = 3;
        this.canGolpe = true;
        this.escena = scene;
    };
    LvlUp(Niveles = 1) {
        this.nivel += 1 * Niveles;
        this.maxVida += 50 * Niveles;
        this.vida = this.maxVida;
        this.maxKi += 10 * Niveles;
        this.ki = this.maxKi;
        this.kiDefensa += 10 * Niveles;
        this.fuerza += 5 * Niveles;
        this.defensa += 5 * Niveles;
        this.nexp += 1000 * Niveles;
        this.statsPoints += 3 * Niveles;
    };

    Mover(Direccion) {
        this.AnimMover(Direccion);
        switch (Direccion) {
            case 'Arriba':
                //this.body.setAccelerationY(-100); interesante efecto de bonging
                this.body.setVelocityY(-200);
                break;
            case 'Abajo':
                this.body.setVelocityY(200);
                break;
            case 'Izquierda':
                this.body.setVelocityX(-200);
                break;
            case 'Derecha':
                this.body.setVelocityX(200);
                break;
            case 'Quieto':
                this.body.setVelocity(0);
        };
    };

    Golpe(Enemigo, Direccion) {
        this.AnimPunch(Direccion);
        if (!Enemigo.active) return;
        let damage = ((this.fuerza + Phaser.Math.Between(0, 3)) - Enemigo.defensa) + ((this.nivel * this.maxCombo) * 100);
        if (damage <= 0) damage = 0;
        return damage;
    };
    DarZenie(Zenie) {
        this.zenie += Zenie;
    }
    DarExp(Exp) {
        this.exp += Exp;
        let nextExp = this.nexp;
        let multiplicador = 0;
        if (this.exp >= nextExp) {
            while (this.exp >= nextExp) {
                multiplicador++;
                nextExp += 1000 * multiplicador;
                this.exp = Math.abs(this.exp - nextExp);
            }
            let showLvlUp = this.escena.add.text(this.body.x + 25, this.body.y + 30, `Level UP`, {
                fontFamily: 'Verdana',
                fontSize: '12px',
                color: 'red'
            }).setOrigin(0.5, 0.5);
            setTimeout(() => {
                showLvlUp.destroy();
            }, 1000);
            this.LvlUp(multiplicador + this.bonusNivel);
        };
        //debug
        this.escena.statsNivel.text = `
                Nivel: ${this.nivel}.
                exp: ${this.exp}/${this.nexp}.
                vida: ${this.vida}/${this.maxVida}.
                ki: ${this.ki}/${this.maxKi}.
                fuerza: ${this.fuerza}.
                defensa: ${this.defensa}.
                ki Defensa: ${this.kiDefensa}.
                statsPoint: ${this.statsPoints}.
                zenie: ${this.zenie}.
            `;
    };
};
export default Player;