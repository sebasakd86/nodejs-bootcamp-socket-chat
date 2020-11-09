const {
    io
} = require('../server');

const {
    Usuarios
} = require('../classes/usuarios');
const {
    crearMensaje
} = require('../utils/utilidades');


const usuarios = new Usuarios()

io.on('connection', (client) => {
    client.on('entrarChat', (usuario, callback) => {
        if (callback) {
            // console.log(usuario);
            if (!usuario.nombre || !usuario.sala)
                return callback({
                    error: true,
                    mensaje: 'Nombre es obligatorio'
                })
            else {

                client.join(usuario.sala)

                let p = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala)

                client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPersonasPorSala(usuario.sala))

                return callback(p)
            }
        }
    })
    client.on('disconnect', () => {
        let pb = usuarios.borrarPersona(client.id)
        client.broadcast.to(pb.sala).emit('crearMensaje', crearMensaje('Admin', `${pb.nombre} se fue del chat`))
        client.broadcast.to(pb.sala).emit('listaPersonas', usuarios.getPersonasPorSala(pb.sala))
    })
    client.on('crearMensaje', (data) => {
        let p = usuarios.getPersona(client.id)
        let msg = crearMensaje(p.nombre, data.msg)
        client.broadcast.to(p.sala).emit('crearMensaje', msg)
    })
    client.on('mensajePrivado', data => {
        let p = usuarios.getPersona(client.id)
        let msg = crearMensaje(p.nombre, data.msg)
        if (data.para) {
            client.broadcast.to(data.para).emit('mensajePrivado', msg)
        }
    });
});