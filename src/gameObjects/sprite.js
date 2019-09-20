export default class Sprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, SpriteName, Frame) {
        super(scene, x, y, SpriteName, Frame);
        // this.setScale(1.5)
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        // this.body.allowDrag = false;
        this.body.immovable = true;
        scene.add.existing(this);
    };
    iniciarAnimaciones(scene) {
        scene.anims.create({
            key: 'down',
            frames: scene.anims.generateFrameNumbers(this.texture.key, {
                frames: [2, 1, 3, 1]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: 'up',
            frames: scene.anims.generateFrameNumbers(this.texture.key, {
                frames: [5, 4, 6, 4]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers(this.texture.key, {
                frames: [8, 7, 9, 7]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers(this.texture.key, {
                frames: [11, 10, 12, 10]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: 'attack-punch-down',
            frames: scene.anims.generateFrameNumbers(this.texture.key, {
                frames: [14, 15, 16, 17]
            }),
            frameRate: 16,
            repeat: 0
        });
        scene.anims.create({
            key: 'attack-punch-up',
            frames: scene.anims.generateFrameNumbers(this.texture.key, {
                frames: [22, 23, 24, 25]
            }),
            frameRate: 16,
            repeat: 0
        });
        scene.anims.create({
            key: 'attack-punch-right',
            frames: scene.anims.generateFrameNumbers(this.texture.key, {
                frames: [30, 31, 32, 33]
            }),
            frameRate: 16,
            repeat: 0
        });
        scene.anims.create({
            key: 'attack-punch-left',
            frames: scene.anims.generateFrameNumbers(this.texture.key, {
                frames: [38, 39, 40, 41]
            }),
            frameRate: 16,
            repeat: 0
        });
    };
    AnimPunch(Direccion) {
        this.iniciarAnimaciones(this.scene);
        switch (Direccion) {
            case 'Arriba':
                this.anims.play('attack-punch-up', true);
                break;
            case 'Abajo':
                this.anims.play('attack-punch-down', false);
                break;
            case 'Derecha':
                this.anims.play('attack-punch-right', true);
                break;
            case 'Izquierda':
                this.anims.play('attack-punch-left', true);
                break;
            case 'Quieto':
                let animacionActual = this.anims.getCurrentKey();
                this.anims.stop();
                switch (animacionActual) {
                    case 'attack-punch-up':
                        this.setTexture(this.texture.key, 4);
                        break;
                    case 'attack-punch-down':
                        this.setTexture(this.texture.key, 1);
                        break;
                    case 'attack-punch-left':
                        this.setTexture(this.texture.key, 10);
                        break;
                    case 'attack-punch-right':
                        this.setTexture(this.texture.key, 7);
                        break;
                }
                break;
        };
    };
    AnimMover(Direccion) {
        this.iniciarAnimaciones(this.scene);
        switch (Direccion) {
            case 'Arriba':
                if (this.anims.isPlaying) return;
                this.anims.play('up', true);
                break;
            case 'Abajo':
                if (this.anims.isPlaying) return;
                this.anims.play('down', true);
                break;
            case 'Izquierda':
                if (this.anims.isPlaying) return;
                this.anims.play('left', true);
                break;
            case 'Derecha':
                if (this.anims.isPlaying) return;
                this.anims.play('right', true);
                break;
            case 'Quieto':
                let animacionActual = this.anims.getCurrentKey();
                this.anims.stop();
                switch (animacionActual) {
                    case 'up':
                        this.setTexture(this.texture.key, 4);
                        break;
                    case 'down':
                        this.setTexture(this.texture.key, 1);
                        break;
                    case 'left':
                        this.setTexture(this.texture.key, 10);
                        break;
                    case 'right':
                        this.setTexture(this.texture.key, 7);
                        break;
                };
                break;
        };

    };
};