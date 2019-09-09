let Utilidades = {
    ColocarTexto: (Scene,x,y,Texto,TamañoFuente) => {
        let text = Scene.make.text({
            x: x,
            y: y,
            text: Texto,
            style: {
                font: `${TamañoFuente}px monospace`,
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);
        return text;
    }
}
export default Utilidades;