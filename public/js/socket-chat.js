var socket = io();

var params = new URLSearchParams(window.location.search)
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('Nombre y Sala son obligatorios')
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function () {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function (resp) {
        console.log('Usuarios conectados', resp);
    })
});

// escuchar
socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});
socket.on('crearMensaje', function(msg){
    console.log('crearMensaje', msg);
})
socket.on('listaPersonas', function(pers){
    console.log('listaPeronas', pers);
})
socket.on('mensajePrivado', function(msg){
    console.log('mensajePrivado', msg);
})