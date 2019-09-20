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
    // ExisteObjeto: (Objeto, Player) => {
    //     let existe = false;
    //     for (const i in Player.inventario) {
    //         console.log(i)
    //         console.log(Player.inventario.hasOwnProperty(i))
    //         if (Player.inventario.hasOwnProperty("Pesas")) {
    //             existe = true;
    //         }
    //     }
    //     return existe;
    // }
}
export default Utilidades;