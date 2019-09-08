class Bootloader extends Phaser.Scene {
    constructor() {
        super({
            key: "Bootloader"
        });
    };
    preload() {
        this.load.on('complete', () => {
            this.scene.start("Juego");
        });
        this.load.on('load', () => {
            console.log(`${Math.round(this.load.progress * 100)}%`);
        });
        this.load.spritesheet('GokuAdultoGT', './src/assets/GokuAdultoGT.png', {
            frameHeight: 32,
            frameWidth: 32,
            margin: 2,
            spacing:2
        });
        this.load.spritesheet('Goku', './src/assets/goku.png', {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Goku SS2', './src/assets/Gokuss2.png', {
            frameHeight: 32,
            frameWidth: 32
        });
        this.load.spritesheet('Goku SS3', './src/assets/Gokuss3.png', {
            frameHeight: 32,
            frameWidth: 32
        });
        this.load.spritesheet('Goku SS4', './src/assets/Gokuss4.png', {
            frameHeight: 32,
            frameWidth: 32
        });
        this.load.spritesheet('Goku SS5', './src/assets/GokuSS5.png', {
            frameHeight: 32,
            frameWidth: 32
        });
    };
    create() {
        console.log("deed")
    }
};


export default Bootloader;