import Juego from './scenes/juego.js';
import Bootloader from './bootloader.js';
import SelectChara from './scenes/selectChara.js';
const config = {
    width: 1350,
    height: 645,
    title: "DBZHU",
    version: "0.9",
    parent: "juego",
    url: "https://japr07.github.io/JuegoTest",
    audio: {
        disableWebAudio: true
    },
    backgroundColor: "#392542",
    pixelArt: true,
    physics: {
        default: "arcade",
        // arcade: {
        //     debug: true
        // }
    },
    type: Phaser.AUTO,
    scene: [
        Bootloader,
        Juego,
        SelectChara
    ]
}

new Phaser.Game(config);