const usuariosBD = require("./conexion").usuarios;
const Usuario = require("../clases/UsuarioClase");
const { encriptarPassword, validarPassword } = require("../middlewares/funcionesPassword");

function validardatos(usuario2) {
    var datoscorrectos = false;
    if (usuario2.nombre != undefined && usuario2.usuario != undefined && usuario2.password != undefined) { 
        datoscorrectos = true;
    }
    return datoscorrectos;
}

async function mostrarUsuarios() {
    const usuarios = await usuariosBD.get();
    var usuariosValidos = [];

    usuarios.forEach(usuario => { 
        const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
        const usuario2 = usuario1.getUsuario;
        if (validardatos(usuario2)) {
            usuariosValidos.push(usuario2);
        }
    });

    return usuariosValidos;
}

async function BuscarporId(id) {
    const usuario = await usuariosBD.doc(id).get(); 
    const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
    var usuarioValido = { error: true };

    if (validardatos(usuario1.getUsuario)) {
        usuarioValido = usuario1.getUsuario;
    }

    return usuarioValido;
}

async function nuevoUsuario(data) {
    const { salt, hash } = encriptarPassword(data.password);
    data.password = hash;
    data.salt = salt;
    data.tipoUsuario = "usuario";
    const usuario1 = new Usuario(data);

    var usuarioValido = false;

    if (validardatos(usuario1.getUsuario)) {
        await usuariosBD.doc().set(usuario1.getUsuario);
        usuarioValido = true;
    }
}

async function borrarUsuario(id) {
    const usuariob = await BuscarporId(id);
    var borrado = false;

    if (usuariob.error != true) {
        await usuariosBD.doc(id).delete();
        borrado = true;
    }

    return borrado;
}

async function editarUsuario(id, data) {
    const usuarioExistente = await BuscarporId(id);
    var usuarioEditado = false;

    if (!usuarioExistente.error) {
        if (data.password && data.password !== usuarioExistente.password) {
            const { salt, hash } = encriptarPassword(data.password);
            data.password = hash;
            data.salt = salt;
        }

        const usuarioActualizado = new Usuario({ id, ...usuarioExistente, ...data });
        
        if (validardatos(usuarioActualizado.getUsuario)) {
            await usuariosBD.doc(id).update(usuarioActualizado.getUsuario);
            usuarioEditado = true;
        }
    }

    return usuarioEditado;
}

module.exports = {
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    BuscarporId,
    editarUsuario
}
