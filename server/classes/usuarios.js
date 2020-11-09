class Usuarios {
    constructor() {
        this.personas = []
    }
    agregarPersona(id, nombre, sala) {
        let persona = {
            id,
            nombre,
            sala
        }

        this.personas.push(persona)

        return this.getPersonasPorSala(sala)
    }
    borrarPersona(id) {
        let personaBorrada = this.getPersona(id)

        this.personas = this.personas.filter(p => p.id != id)

        return personaBorrada
    }
    getPersona(id) {
        return this.personas.filter(p => p.id === id)[0]
    }

    getPersonas() {
        return this.personas
    }

    getPersonasPorSala(sala) {
        return this.personas.filter(p => p.sala === sala)
    }   


}

module.exports = {
    Usuarios
}