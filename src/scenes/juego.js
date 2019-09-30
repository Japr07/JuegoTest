import Player from '../gameObjects/player.js';
import Npcs from '../gameObjects/npcs.js';
import Utilidades from '../utils/utilidades.js';

export default class Juego extends Phaser.Scene {
    constructor() {
        super({
            key: "Juego"
        });
    };
    init(personaje) {
        this.player = new Player(this, 100, 200, personaje, 1).setInteractive();
    }
    create() {
        this.goku = new Npcs(this, 50, 100, 'Goku', 1, 1);
        this.gokuAdult = new Npcs(this, 150, 100, 'GokuAdultoGT', 1, 2);
        this.gokuss = new Npcs(this, 250, 100, 'Goku SS', 1, 4);
        this.gokuss2 = new Npcs(this, 350, 100, 'Goku SS2', 1, 8);
        this.gokuss3 = new Npcs(this, 450, 100, 'Goku SS3', 1, 16);
        this.gokuss4 = new Npcs(this, 550, 100, 'Goku SS4', 1, 32);
        this.gokuss5 = new Npcs(this, 650, 100, 'Goku SS5', 1, 64);
        this.GoldenDestroyer = new Npcs(this, 800, 100, 'Golden Destroyer', 1, 128);
        this.enemigo = false;
        this.enemigos = this.add.group([this.goku, this.gokuAdult, this.GoldenDestroyer, this.gokuss, this.gokuss2, this.gokuss3, this.gokuss4, this.gokuss5]);

        this.enemigos.getChildren().forEach((enemigo) => {
            enemigo.setInteractive();
            enemigo.Moverse();
            enemigo.on(Phaser.Input.Events.POINTER_DOWN, () => {
                enemigo.ShowStats();
            });
        });
        this.player.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.player.ShowStats();
        });
        //buscar correccion de bug que sigue en target cuando no lo esta... 
        this.physics.add.collider(this.enemigos, this.player, this.SeleccionarEnemigo, false, this);
        this.teclas = this.input.keyboard.addKeys('up,down,left,right,a,d,s,i,h');
        this.dir = 'Abajo';
        Utilidades.ColocarTexto(this, this.game.config.width - 250, 100, `
        Instrucciones:
        -Moverse: Flechas
        -Golpear: A
        -Generar mas npcs: D
        -Usar StatsPoints: S
        -Inventario: I
        -Changelogs: H
        -Click sobre un NPC o el
        player para ver sus stats
        `, 18);
        this.multi = 1;
    }
    update(time, delta) {

        if (Phaser.Input.Keyboard.JustDown(this.teclas.d)) {
            this.multi++
            this.goku = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'Goku', 1, 1 * this.multi);
            this.gokuAdult = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'GokuAdultoGT', 1, 2 * this.multi);
            this.gokuss = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'Goku SS', 1, 4 * this.multi);
            this.gokuss2 = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'Goku SS2', 1, 8 * this.multi);
            this.gokuss3 = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'Goku SS3', 1, 16 * this.multi);
            this.gokuss4 = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'Goku SS4', 1, 32 * this.multi);
            this.gokuss5 = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'Goku SS5', 1, 64 * this.multi);
            this.GoldenDestroyer = new Npcs(this, Phaser.Math.Between(50, this.game.config.width - 50), Phaser.Math.Between(50, this.game.config.height - 50), 'Golden Destroyer', 1, 128 * this.multi);
            this.enemigos = this.add.group([this.goku, this.gokuAdult, this.GoldenDestroyer, this.gokuss, this.gokuss2, this.gokuss3, this.gokuss4, this.gokuss5]);
            this.physics.add.collider(this.enemigos, this.player, this.SeleccionarEnemigo, false, this);
            this.enemigos.getChildren().forEach((enemigo) => {
                enemigo.setInteractive();
                enemigo.Moverse();
                enemigo.on(Phaser.Input.Events.POINTER_DOWN, () => {
                    enemigo.ShowStats();
                });
            });
        }
        if (Phaser.Input.Keyboard.JustDown(this.teclas.s)) {
            this.player.StatsPoints()
        };
        if (Phaser.Input.Keyboard.JustDown(this.teclas.h)) {
            document.open('./src/utils/changelogs.html', 'Changelogs', 'height=500,width=400', false)
        };
        if (Phaser.Input.Keyboard.JustDown(this.teclas.i)) {
            this.player.Inventario();
        };

        if (this.teclas.a.isDown && this.player.canGolpe) {
            this.player.canGolpe = false;
            setTimeout(() => {
                this.player.canGolpe = true;
                this.player.AnimPunch("Quieto");
            }, 550);
            let damage = this.player.Golpe(this.enemigo, this.dir);
            if (!this.enemigo.active) return;
            Utilidades.ColocarTexto(this, this.enemigo.body.x + this.enemigo.width / 2, this.enemigo.body.y, `Daño: ${damage}`, 13, 300);
            this.enemigo.takeDamage(damage, "fisico", this.player);
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