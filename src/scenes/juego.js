import Player from '../gameObjects/player.js';
import Npcs from '../gameObjects/npcs.js';

class Juego extends Phaser.Scene {
    constructor() {
        super({
            key: "Juego"
        });
    };
    create() {
        this.gokuAdult = new Npcs(this, 50, 100, 'GokuAdultoGT', 1, 1);
        this.gokuss = new Npcs(this, 150, 100, 'Goku SS', 1, 2);
        this.gokuss2 = new Npcs(this, 250, 100, 'Goku SS2', 1, 4);
        this.gokuss3 = new Npcs(this, 350, 100, 'Goku SS3', 1, 8);
        this.gokuss4 = new Npcs(this, 450, 100, 'Goku SS4', 1, 16);
        this.gokuss5 = new Npcs(this, 550, 100, 'Goku SS5', 1, 32);
        this.GoldenDestroyer = new Npcs(this, 700, 100, 'Golden Destroyer', 1, 64);
        this.enemigo = false;
        this.enemigos = this.add.group([this.gokuAdult, this.GoldenDestroyer, this.gokuss, this.gokuss2, this.gokuss3, this.gokuss4, this.gokuss5]);
        this.player = new Player(this, 100, 200, 'Goku', 1);
        //buscar correccion de bug que sigue en target cuando no lo esta... 
        this.physics.add.collider(this.enemigos, this.player, null, this.SeleccionarEnemigo, this);
        this.teclas = this.input.keyboard.addKeys('up,down,left,right,a,d');
        this.dir = 'Abajo';
        this.make.text({
            x: this.game.config.width - 150,
            y: 50,
            text: `
        Instrucciones:
        Moverse: Flechas
        Golpear: A
        Generar mas npcs: D
        `,
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);
        //stats
        let text = `
        Nivel: ${this.player.nivel}
        exp: ${this.player.exp}/${this.player.nexp}
        vida: ${this.player.vida}/${this.player.maxVida}
        ki: ${this.player.ki}/${this.player.maxKi}
        fuerza: ${this.player.fuerza}
        defensa: ${this.player.defensa}
        ki Defensa: ${this.player.kiDefensa}
        statsPoint ${this.player.statsPoints}
        zenie: ${this.player.zenie}
        `;
        this.statsNivel = this.make.text({
            x: this.game.config.width / 2,
            y: this.game.config.width / 4,
            text: text,
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

    }
    update(time, delta) {

        if (Phaser.Input.Keyboard.JustDown(this.teclas.d)) {
            this.gokuAdult = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'GokuAdultoGT', 1, 1);
            this.gokuss = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'Goku SS', 1, 2);
            this.gokuss2 = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'Goku SS2', 1, 4);
            this.gokuss3 = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'Goku SS3', 1, 8);
            this.gokuss4 = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'Goku SS4', 1, 16);
            this.gokuss5 = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'Goku SS5', 1, 32);
            this.GoldenDestroyer = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'Golden Destroyer', 1, 64);
            this.enemigos = this.add.group([this.gokuAdult, this.GoldenDestroyer, this.gokuss, this.gokuss2, this.gokuss3, this.gokuss4, this.gokuss5]);
            this.physics.add.collider(this.enemigos, this.player, null, this.SeleccionarEnemigo, this);

        }

        if (this.teclas.a.isDown && this.player.canGolpe) {
            this.player.canGolpe = false;
            setTimeout(() => {
                this.player.canGolpe = true;
                this.player.AnimPunch("Quieto");
            }, 350);
            let damage = this.player.Golpe(this.enemigo, this.dir);
            if (!this.enemigo.active) return;
            let showDamage = this.make.text({
                x: this.enemigo.body.x + 25,
                y: this.enemigo.body.y,
                text: `Daño: ${damage}`,
                style: {
                    font: '13px monospace',
                    fill: '#ffffff'
                }
            }).setOrigin(0.5, 0.5);

            setTimeout(() => {
                showDamage.destroy();
            }, 300);
            this.enemigo.takeDamage(damage, this.player);
            this.enemigo = false;
        };
        if (this.teclas.down.isDown && !this.player.body.wasTouching.down) {
            this.player.Mover('Abajo');

            this.dir = 'Abajo';
        } else if (Phaser.Input.Keyboard.JustUp(this.teclas.down)) {
            this.player.Mover('Quieto');
        };

        if (this.teclas.up.isDown) {
            this.player.Mover('Arriba');
            this.dir = 'Arriba';
        } else if (Phaser.Input.Keyboard.JustUp(this.teclas.up)) {
            this.player.Mover('Quieto');
        };

        if (this.teclas.left.isDown) {
            this.player.Mover('Izquierda');
            this.dir = 'Izquierda';
        } else if (Phaser.Input.Keyboard.JustUp(this.teclas.left)) {
            this.player.Mover('Quieto');
        };

        if (this.teclas.right.isDown) {
            this.player.Mover('Derecha');
            this.dir = 'Derecha';
        } else if (Phaser.Input.Keyboard.JustUp(this.teclas.right)) {
            this.player.Mover('Quieto');
        };
    };
    SeleccionarEnemigo(enemigo) {
        this.enemigo = enemigo;
    };
};

export default Juego;