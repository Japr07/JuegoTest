import Utilidades from "./utils/utilidades.js";

class Bootloader extends Phaser.Scene {
    constructor() {
        super({
            key: "Bootloader"
        });
    };
    preload() {

        const rutaAudio = './src/assets/audio/';
        const rutaSprite = './src/assets/sprites/';


        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = Utilidades.ColocarTexto(this, width / 2, height / 2 - 50, 'Cargando...', 20);
        let percentText = Utilidades.ColocarTexto(this, width / 2, height / 2 - 5, '0%', 18);
        let assetText = Utilidades.ColocarTexto(this, width / 2, height / 2 + 50, '', 18);
        this.load.on('progress', value => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        this.load.on('fileprogress', file => {
            assetText.setText('Cargando Archivo: ' + file.key);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.scene.start("Juego");
        });

        this.load.audio('Golpe', `${rutaAudio}hit1.wav`);
        this.load.audio('Damage', `${rutaAudio}hit2.wav`);
        this.load.audio('LvlUp', `${rutaAudio}newskill.wav`);

        this.load.image('Cerrar', `${rutaSprite}Cerrar.png`);
        this.load.image('Boton Mas', `${rutaSprite}Mas.png`);
        this.load.image('Boton Menos', `${rutaSprite}Menos.png`);
        this.load.image('Boton Fondo', `${rutaSprite}botonFondo.png`);

        this.load.spritesheet('GokuAdultoGT', `${rutaSprite}AdultGTGoku.png`, {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('GokuAdultoGT', `${rutaSprite}AdultGTGoku.png`, {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Goku', `${rutaSprite}goku.png`, {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Goku SS', `${rutaSprite}Gokuss.png`, {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Goku SS2', `${rutaSprite}Gokuss2.png`, {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Goku SS3', `${rutaSprite}Gokuss3.png`, {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Goku SS4', `${rutaSprite}Gokuss4.png`, {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Goku SS5', `${rutaSprite}GokuSS5.png`, {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Golden Destroyer', `${rutaSprite}golden destroyer64.png`, {
            frameHeight: 136,
            frameWidth: 136
        });
    };
};


export default Bootloader;