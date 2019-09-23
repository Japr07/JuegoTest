import Juego from './scenes/juego.js';
import Bootloader from './bootloader.js';
const config = {
    width: 1350,
    height: 645,
    title: "DBZHU",
    version: "0.1.0",
    parent: "juego",
    url: "http://dbzhu.com",
    backgroundColor: "#392542",
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    type: Phaser.AUTO,
    scene: [
        Bootloader,
        Juego
    ]
}

new Phaser.Game(config);