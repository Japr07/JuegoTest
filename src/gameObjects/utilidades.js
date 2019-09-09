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
        }).setOrigin(0.5, 0.5);
        if (Tiempo != null) {
            setTimeout(() => {
                text.destroy();
            }, Tiempo);
        } else {
            return text;
        }
    }
}
export default Utilidades;