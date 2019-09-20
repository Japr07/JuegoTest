import Sprite from "./sprite.js";
import Utilidades from "../utils/utilidades.js";

export default class Player extends Sprite {
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
        this.inventario = [{
            nombre: "Pesas",
            cantidad: 1
        }];
        this.velPuno = 2000;
        this.maxCombo = 3;
        this.canGolpe = true;

        //
        this.golpeAudio = this.scene.sound.add('Golpe', {
            loop: false
        });
        this.lvlUpAudio = this.scene.sound.add('LvlUp', {
            loop: false
        });
    };
    LvlUp(Niveles = 1) {
        this.lvlUpAudio.play();
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
    ShowStats() {
        let contenedor = this.scene.add.container(this.scene.game.config.width / 2 - 200, this.scene.game.config.height / 2 - 100);
        let area = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 200, 200);
        let graphics = this.scene.add.graphics({
            fillStyle: {
                color: 0x0000aa
            }
        });
        graphics.fillRectShape(area);
        let stats = Utilidades.ColocarTexto(this.scene, area.x + 80, area.y + 100, `
        Nombre: Player
        Nivel: ${this.nivel}
        exp: ${this.exp}/${this.nexp}
        vida: ${this.vida}/${this.maxVida}
        ki: ${this.ki}/${this.maxKi}
        fuerza: ${this.fuerza}
        defensa: ${this.defensa}
        ki Defensa: ${this.kiDefensa}
        statsPoint: ${this.statsPoints}
        zenie: ${this.zenie}
        `, 13);
        let cerrar = this.scene.add.image(area.x + 200, area.y, 'Cerrar').setAngle(45).setScale(0.6).setInteractive();
        contenedor.add([graphics, stats, cerrar]);
        cerrar.on(Phaser.Input.Events.POINTER_DOWN, () => {
            contenedor.destroy();
        });
    }

    Golpe(Enemigo, Direccion) {

        this.golpeAudio.play();
        this.AnimPunch(Direccion);
        if (!Enemigo.active) return;
        let damage = ((this.fuerza + Phaser.Math.Between(0, 3)) - Enemigo.defensa) + (this.nivel * this.maxCombo) * 100;
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
    StatsPoints() {
        let pointVida = 0;
        let pointKi = 0;
        let pointKiDefensa = 0;
        let pointFuerza = 0;
        let pointDefensa = 0;
        let tempStatsPoint = this.statsPoints;

        let contenedor = this.scene.add.container(this.scene.game.config.width / 2 - 200, this.scene.game.config.height / 2 - 100);
        let area = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 400, 250);
        let graphics = this.scene.add.graphics({
            fillStyle: {
                color: 0x0000aa
            }
        });
        graphics.fillRectShape(area);
        let anunciado = Utilidades.ColocarTexto(this.scene, area.x + 170, area.y + 30, `
             Asigna tus StatsPoints
        Tienes actualmente ${this.statsPoints} StatsPoints
        `, 18);
        let stats = Utilidades.ColocarTexto(this.scene, area.x + 100, area.y + 110, `
              Vida -
                Ki -
        Ki Defensa -
            Fuerza - 
           Defensa -
        `, 18);
        let aceptarText = Utilidades.ColocarTexto(this.scene, area.x + area.width / 2, area.y + area.height - 50, "Aceptar", 22);
        let aceptarFondo = this.scene.add.image(area.x + area.width / 2, area.y + area.height - 50, 'Boton Fondo').setOrigin(0.5).setInteractive();


        let textVida = Utilidades.ColocarTexto(this.scene, area.x + 250, area.y + 74, `${pointVida}`, 18)
        let textKi = Utilidades.ColocarTexto(this.scene, area.x + 250, area.y + 92, `${pointKi}`, 18)
        let textKiDefensa = Utilidades.ColocarTexto(this.scene, area.x + 250, area.y + 110, `${pointKiDefensa}`, 18)
        let textFuerza = Utilidades.ColocarTexto(this.scene, area.x + 250, area.y + 128, `${pointFuerza}`, 18)
        let textDefensa = Utilidades.ColocarTexto(this.scene, area.x + 250, area.y + 146, `${pointDefensa}`, 18)


        let masVida = this.scene.add.image(area.x + 280, area.y + 74, 'Boton Mas').setScale(2).setOrigin(0.5).setInteractive();
        let masKi = this.scene.add.image(area.x + 280, area.y + 92, 'Boton Mas').setScale(2).setOrigin(0.5).setInteractive();
        let masKiDefensa = this.scene.add.image(area.x + 280, area.y + 110, 'Boton Mas').setScale(2).setOrigin(0.5).setInteractive();
        let masFuerza = this.scene.add.image(area.x + 280, area.y + 128, 'Boton Mas').setScale(2).setOrigin(0.5).setInteractive();
        let masDefensa = this.scene.add.image(area.x + 280, area.y + 146, 'Boton Mas').setScale(2).setOrigin(0.5).setInteractive();

        let menosVida = this.scene.add.image(area.x + 220, area.y + 74, 'Boton Menos').setScale(2).setOrigin(0.5).setInteractive();
        let menosKi = this.scene.add.image(area.x + 220, area.y + 92, 'Boton Menos').setScale(2).setOrigin(0.5).setInteractive();
        let menosKiDefensa = this.scene.add.image(area.x + 220, area.y + 110, 'Boton Menos').setScale(2).setOrigin(0.5).setInteractive();
        let menosFuerza = this.scene.add.image(area.x + 220, area.y + 128, 'Boton Menos').setScale(2).setOrigin(0.5).setInteractive();
        let menosDefensa = this.scene.add.image(area.x + 220, area.y + 146, 'Boton Menos').setScale(2).setOrigin(0.5).setInteractive();

        masVida.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.statsPoints > pointVida && tempStatsPoint > 0) {
                tempStatsPoint--;
                pointVida++;
                anunciado.text = `
             Asigna tus StatsPoints
        Tienes actualmente ${tempStatsPoint} StatsPoints
        `;
                textVida.text = `${pointVida}`;
            };
        });
        masKi.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.statsPoints > pointKi && tempStatsPoint > 0) {
                tempStatsPoint--;
                pointKi++;
                anunciado.text = `
             Asigna tus StatsPoints
        Tienes actualmente ${tempStatsPoint} StatsPoints
        `;
                textKi.text = `${pointKi}`;
            };
        })
        masKiDefensa.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.statsPoints > pointKiDefensa && tempStatsPoint > 0) {
                tempStatsPoint--;
                pointKiDefensa++;
                anunciado.text = `
             Asigna tus StatsPoints
        Tienes actualmente ${tempStatsPoint} StatsPoints
        `;
                textKiDefensa.text = `${pointKiDefensa}`;
            };
        })
        masFuerza.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.statsPoints > pointFuerza && tempStatsPoint > 0) {
                tempStatsPoint--;
                pointFuerza++;
                anunciado.text = `
             Asigna tus StatsPoints
        Tienes actualmente ${tempStatsPoint} StatsPoints
        `;
                textFuerza.text = `${pointFuerza}`;
            };
        })
        masDefensa.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.statsPoints > pointDefensa && tempStatsPoint > 0) {
                tempStatsPoint--;
                pointDefensa++;
                anunciado.text = `
             Asigna tus StatsPoints
        Tienes actualmente ${tempStatsPoint} StatsPoints
        `;
                textDefensa.text = `${pointDefensa}`;
            };
        })
        menosVida.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (pointVida > 0) {
                tempStatsPoint++;
                pointVida--;
                anunciado.text = `
             Asigna tus StatsPoints
        Tienes actualmente ${tempStatsPoint} StatsPoints
        `;
                textVida.text = `${pointVida}`;
            };
        });
        menosKi.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (pointKi > 0) {
                tempStatsPoint++;
                pointKi--;
                anunciado.text = `
             Asigna tus StatsPoints
        Tienes actualmente ${tempStatsPoint} StatsPoints
        `;
                textKi.text = `${pointKi}`;
            };
        });
        menosKiDefensa.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (pointKiDefensa > 0) {
                tempStatsPoint++;
                pointKiDefensa--;
                anunciado.text = `
             Asigna tus StatsPoints
        Tienes actualmente ${tempStatsPoint} StatsPoints
        `;
                textKiDefensa.text = `${pointKiDefensa}`;
            };
        });
        menosFuerza.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (pointFuerza > 0) {
                tempStatsPoint++;
                pointFuerza--;
                anunciado.text = `
             Asigna tus StatsPoints
        Tienes actualmente ${tempStatsPoint} StatsPoints
        `;
                textFuerza.text = `${pointFuerza}`;
            };
        });
        menosDefensa.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (pointDefensa > 0) {
                tempStatsPoint++;
                pointDefensa--;
                anunciado.text = `
             Asigna tus StatsPoints
        Tienes actualmente ${tempStatsPoint} StatsPoints
        `;
                textDefensa.text = `${pointDefensa}`;
            };
        });
        aceptarFondo.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (pointVida > 0) {
                this.vida += (100 * pointVida);
                this.maxVida += (100 * pointVida);
                this.statsPoints -= (1 * pointVida);
            }
            if (pointKi > 0) {
                this.ki += (50 * pointKi);
                this.maxKi += (50 * pointKi);
                this.statsPoints -= (1 * pointKi);
            }
            if (pointKiDefensa > 0) {
                this.kiDefensa += (50 * pointKiDefensa);
                this.statsPoints -= (1 * pointKiDefensa);
            }
            if (pointFuerza > 0) {
                this.fuerza += (10 * pointFuerza);
                this.statsPoints -= (1 * pointFuerza);
            }
            if (pointDefensa > 0) {
                this.defensa += (10 * pointDefensa);
                this.statsPoints -= (1 * pointDefensa);
            }
            contenedor.destroy();
        });
        let cerrar = this.scene.add.image(area.x + area.width, area.y, 'Cerrar').setAngle(45).setScale(0.6).setInteractive();
        contenedor.add([graphics, anunciado, aceptarFondo, aceptarText, cerrar, textVida, textKi, textKiDefensa, textFuerza, textDefensa, masVida, masKi, masKiDefensa, masFuerza, masDefensa, stats, menosVida, menosKi, menosKiDefensa, menosFuerza, menosDefensa]);
        cerrar.on(Phaser.Input.Events.POINTER_DOWN, () => {
            contenedor.destroy();
        });
    }
};