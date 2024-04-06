const Usuario = require('../models/Usuario'); // Importar el modelo Usuario definido en Sequelize
const bcrypt = require('bcrypt');

// Función para Loggear
const login = async (req, res) => {
    const { email, password } = req.body;

    // Verificar si el usuario y la contraseña están presentes en la solicitud
    if (!email || !password) {
        res.json({ respuesta: false });
        return;
    }

    // Agregar registro de depuración para verificar si Usuario está definido
    console.log('Usuario: ', Usuario);

    try {
        // 1) Buscar al usuario por su email
        const usuarioEncontrado = await Usuario.findOne({ where: { email } });

        // 2) Verificar si el usuario existe y si la contraseña es correcta
        if (usuarioEncontrado && bcrypt.compareSync(password, usuarioEncontrado.password)) {
            res.json({ usuarioEncontrado:usuarioEncontrado });
        } else {
            res.send(null);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ respuesta: false });
    }
}

// Función para registrar un nuevo Usuario
const crearUsuario = async (req, res) => {
    const nombre = req.body.nombre;
    const username = req.body.username;
    const rol = req.body.rol;
    const email = req.body.email;
    const password = req.body.password;
    const aprobado = req.body.aprobado;

    // Verificar si el usuario y la contraseña están presentes en la solicitud
    if (!nombre ||!username || !rol || !email || !password) {
        res.json({ respuesta: false });
        return;
    }

    try {
        // Encriptar la contraseña
        const hashedPassword = bcrypt.hashSync(password, 10)
        // Crear el usuario en la base de datos
        await Usuario.create({ username, rol, email, password: hashedPassword, aprobado });
        res.json({ respuesta: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ respuesta: false });
    }
}

// Devuelve un arreglo de objetos/usuarios
const usuariosDesaprobados = async (req, res) => {
    try {
        // 1) Buscar usuario cuyo campo aporbado sea falso 
        const usuariosDesaprobados = await Usuario.findAll({ where: { aprobado:false } });

        // 2) Asignamos el/los usuario(s) obtenidos a la const
            res.json({ usuariosDesaprobados:usuariosDesaprobados });
    } catch (error) {
        console.error([error]);
        res.json([]);
    }
}

// Cambia el estado aprobado de un usuario
const aprobarUsuario = async (req, res) => {
    const id = req.body.id;
    
    try {
        // Buscar el usuario por ID en la base de datos
        const usuario = await Usuario.findByPk(id); //findById

        if (!usuario) {
            return res.json({ error: 'Usuario: '+id+' no encontrado' });
        }

        // Actualizar el campo "aprobado" del usuario a true
        usuario.aprobado = true;
    
        // Guardar el usuario actualizado en la base de datos
        await usuario.save();

        res.json(usuario); // Devolver el usuario actualizado como respuesta
    } catch (error) {
    
        console.error('Error al aprobar usuario: ', error);
        res.json({ error: 'Error interno del servidor' });
    }
}

//-------------------- PEND DE IMPLEMENTAR AUN -------------------------------
// Función para editar la contraseña de un usuario
const editarUsuario = async (req, res) => {
    const { email, password } = req.body;

    // Verificar si el usuario y la contraseña están presentes en la solicitud
    if (!email || !password) {
        res.json({ respuesta: false });
        return;
    }

    try {
        // Encriptar la nueva contraseña
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Buscar al usuario por su email y actualizar la contraseña
        await Usuario.update({ password: hashedPassword }, { where: { email } });

        res.json({ respuesta: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ respuesta: false });
    }
}

// Verificar que los campos no estén vacíos al editar un usuario
function verificarUsuario(email, password) {
    return email && password;
}

module.exports = {
    login,
    crearUsuario,
    usuariosDesaprobados,
    aprobarUsuario,

    editarUsuario,
    buscarUsuarioPorNombre
    
}