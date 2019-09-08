class Bootloader extends Phaser.Scene {
    constructor() {
        super({
            key: "Bootloader"
        });
    };
    preload() {
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Cargando...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setOrigin(0.5, 0.5);

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

        this.load.spritesheet('GokuAdultoGT', './src/assets/AdultGTGoku.png', {
            frameHeight: 68,
            frameWidth: 68,
        });
        this.load.spritesheet('Goku', './src/assets/goku.png', {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Goku SS', './src/assets/Gokuss.png', {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Goku SS2', './src/assets/Gokuss2.png', {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Goku SS3', './src/assets/Gokuss3.png', {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Goku SS4', './src/assets/Gokuss4.png', {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Goku SS5', './src/assets/GokuSS5.png', {
            frameHeight: 68,
            frameWidth: 68
        });
        this.load.spritesheet('Golden Destroyer', './src/assets/golden destroyer64.png', {
            frameHeight: 136,
            frameWidth: 136
        });
    };
    create() {
        console.log("deed")
    }
};


export default Bootloader;