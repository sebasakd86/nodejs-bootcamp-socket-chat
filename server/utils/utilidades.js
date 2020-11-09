const crearMensaje = (nombre, msg) => {
    return {
        nombre,
        msg,
        fecha: new Date().getTime()
    }
}
module.exports = {
    crearMensaje
}