import Sprite from "./sprite.js";
import Utilidades from "../utils/utilidades.js";

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
            Utilidades.ColocarTexto(this.scene, this.body.x + 34, this.body.y + 30, 'Level UP', 13, 1200);
            this.LvlUp(multiplicador + this.bonusNivel);
        };
    };
    ActualizarStats(Scene) {
        Scene.statsNivel.text = `
        Nivel: ${this.nivel}
        exp: ${this.exp}/${this.nexp}
        vida: ${this.vida}/${this.maxVida}
        ki: ${this.ki}/${this.maxKi}
        fuerza: ${this.fuerza}
        defensa: ${this.defensa}
        ki Defensa: ${this.kiDefensa}
        statsPoint: ${this.statsPoints}
        zenie: ${this.zenie}
        `;
    }
    StatsPoints() {
        let NuevaVentana = window.open("./src/utils/StatsPoints.html", "Test", "width=250,height=200,scrollbars=yes,resizable=yes");
        NuevaVentana.addEventListener("click", () => {
            console.log("casoas")
        })
        NuevaVentana.addEventListener("load", () => {
            NuevaVentana.document.getElementById("cantidad").value = this.statsPoints;
        })
        NuevaVentana.addEventListener("submit", (e) => {
            e.preventDefault();
            let error = NuevaVentana.document.getElementById("error");
            let stats = NuevaVentana.document.getElementById("Stats").value;
            let cantidad = parseInt(NuevaVentana.document.getElementById("cantidad").value);
            if (cantidad > this.statsPoints) {
                cantidad = this.statsPoints;
            };
            switch (stats) {
                case "MaxCombo":
                    if (this.statsPoints >= 5 * cantidad) {
                        this.maxCombo += (1 * cantidad);
                        this.statsPoints -= (5 * cantidad);
                    }
                    break;
                case "Vida":
                    if (this.statsPoints >= cantidad) {
                        this.vida += (100 * cantidad);
                        this.maxVida += (100 * cantidad);
                        this.statsPoints -= (1 * cantidad);
                    }
                    break;
                case "Ki":
                    if (this.statsPoints >= cantidad) {
                        this.ki += (50 * cantidad);
                        this.maxKi += (50 * cantidad);
                        this.statsPoints -= (1 * cantidad);
                    }
                    break;
                case "KiDefensa":
                    if (this.statsPoints >= cantidad) {
                        this.kiDefensa += (50 * cantidad);
                        this.statsPoints -= (1 * cantidad);
                    }
                    break;
                case "Fuerza":
                    if (this.statsPoints >= cantidad) {
                        this.fuerza += (10 * cantidad);
                        this.statsPoints -= (1 * cantidad);
                    }
                    break;
                case "Defensa":
                    if (this.statsPoints >= cantidad) {
                        this.defensa += (10 * cantidad);
                        this.statsPoints -= (1 * cantidad);
                    }
                    break;
            }
            this.ActualizarStats(this.scene);
            NuevaVentana.close();
        })
    }
};
export default Player;