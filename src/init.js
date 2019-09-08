import Juego from './scenes/juego.js';
import Bootloader from './bootloader.js';
const config = {
    width: 1350,
    height: 650,
    title: "DBZHU",
    version: "0.0.1",
    parent: "juego",
    url: "http://dbzhu.com",
    backgroundColor: "#392542",
    physics: {
        default: "arcade"
    },
    type: Phaser.AUTO,
    scene: [
        Bootloader,
        Juego
    ]
}

new Phaser.Game(config);