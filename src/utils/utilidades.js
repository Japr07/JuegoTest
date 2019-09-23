let Utilidades = {
    ColocarTexto: (Scene, x, y, Texto, TamañoFuente, Tiempo = null) => {
        let text = Scene.make.text({
            x: x,
            y: y,
            text: Texto,
            style: {
                font: `${TamañoFuente}px monospace`,
                fill: '#ffffff'
            }
        }).setOrigin(0.5);
        if (Tiempo != null) {
            setTimeout(() => {
                text.destroy();
            }, Tiempo);
        } else {
            return text;
        }
    },
    NuevaVentana: (scene, data) => {
        let contenedor = scene.add.container(scene.game.config.width / 2 - 200, scene.game.config.height / 2 - 100);
        let area = new Phaser.GameObjects.Rectangle(scene, 0, 0, data.width + 40, data.height + 40);
        let graphics = scene.add.graphics({
            fillStyle: {
                color: 0x0000aa
            }
        });
        data.x = data.width / 2 + 20;
        data.y = data.height / 2 + 20;
        graphics.fillRectShape(area);
        let cerrar = scene.add.image(area.width, area.y, 'Cerrar').setAngle(45).setScale(0.6).setInteractive();
        contenedor.add([graphics, data, cerrar]);
        cerrar.on(Phaser.Input.Events.POINTER_DOWN, () => {
            contenedor.destroy();
        });
    },
    ExisteObjeto: (Objeto, Player) => {
        for (const i in Player.inventario) {
            if (Objeto == Player.inventario[i].nombre) {
                return {
                    existe: true,
                    posicion: i
                };
            }
        }
        return {
            existe: false
        };
    },
    PlayerExpBoost: (Player) => {
        if (Player.inventario.length == 0) {
            return Player.expboost = 1;
        }
        for (const i of Player.inventario) {
            if (i.nombre === 'Pesas') {
                return Player.expboost = i.cantidad + 1;
            } else {
                Player.expboost = 1;
            }
        }
    }
}
export default Utilidades;