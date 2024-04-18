// Importar el modelo Usuario definido en Sequelize
const bcrypt = require('bcrypt');
const connection = require('../db.js');

/**
 * @param {Request} req
 * @param {Response} res
 */

// Función para Loggear
const login = async (req, res) => {
    const { username, password } = req.body;

  // Validación de datos
  if (!username || !password) {
    res.status(400).json({ error: 'El nombre de usuario y la contraseña son obligatorios' });
    return;
  }

  // Consulta a la base de datos
  connection.query('SELECT * FROM usuario WHERE username = ? AND password = ?', [username, password], (error, results) => {
    if (error) {
      console.error('Error al autenticar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    } else {
      // Usuario autenticado correctamente
      const user = results[0]; // Se puede obtener más información del usuario aquí

      // Generar token de acceso (opcional)
      // ...

      res.status(200).json(user );
    }
  });
}

// Función para registrar un nuevo Usuario
const crearUsuario = async (req, res) => {
  const newUser = req.body;
  console.log("Probanso como es que se debe de haceresto");
  console.log(newUser);
  const nombre = req.body.username;
  
  console.log(nombre);
  
  connection.query('INSERT INTO usuario (nombre, username, password, dinero_real, moneda_virtual, rol, estado) VALUES (?, ?, ?, ?, ?, ?, ?)', [newUser.nombre, newUser.username, newUser.password, newUser.dinero_real, newUser.moneda_virtual, newUser.rol, newUser.estado], (error, results) => {
    if (error) {
      console.error('Error al insertar nuevo usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Nuevo usuario insertado con éxito');
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    }
  });
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

const cargarDinero = async (req, res) => {
  const idProducto  = req.params.id;
  const dinero_real_sumar  = req.params.dinero_real;
  const moneda_virtual_sumar  = req.params.moneda_virtual;

  // Obtener el dinero actual del usuario
  connection.query('SELECT dinero_real, moneda_virtual FROM usuario WHERE id = ?', [idProducto], (error, results) => {
    if (error) {
      console.error('Error al obtener el dinero del usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    if (results.length === 0) {
      console.log('Usuario no encontrado');
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    // Sumar el dinero actual con el dinero a sumar
    const nuevo_dinero_real = parseFloat(results[0].dinero_real) + parseFloat(dinero_real_sumar);
    const nueva_moneda_virtual = parseFloat(results[0].moneda_virtual) + parseFloat(moneda_virtual_sumar);

    console.log(results[0].dinero_real+ dinero_real_sumar)
    console.log(results[0].moneda_virtual+ moneda_virtual_sumar)
    console.log(nuevo_dinero_real)
    console.log(nueva_moneda_virtual)
    console.log(idProducto)

    // Actualizar el dinero del usuario en la base de datos
    connection.query('UPDATE usuario SET dinero_real = ?, moneda_virtual = ? WHERE id = ?', [nuevo_dinero_real, nueva_moneda_virtual, idProducto], (updateError, updateResults) => {
      if (updateError) {
        console.error('Error al actualizar el dinero del usuario:', updateError);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

      if (updateResults.affectedRows === 0) {
        console.log('Usuario no encontrado');
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }

      console.log('Dinero del usuario actualizado con éxito');
      res.status(200).json({ message: 'Dinero del usuario actualizado exitosamente' });
    });
  });
}
const descontarDinero = async (req, res) => {
  const idProducto  = parseInt(req.params.id, 10);
  const dinero_real_sumar  = parseFloat(req.params.dinero_real);
  const moneda_virtual_sumar  = parseFloat(req.params.moneda_virtual);

  // Obtener el dinero actual del usuario
  connection.query('SELECT dinero_real, moneda_virtual FROM usuario WHERE id = ?', [idProducto], (error, results) => {
    if (error) {
      console.error('Error al obtener el dinero del usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    if (results.length === 0) {
      console.log('Usuario no encontrado');
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    // Sumar el dinero actual con el dinero a sumar
    const nuevo_dinero_real = parseFloat(results[0].dinero_real) - parseFloat(dinero_real_sumar);
    const nueva_moneda_virtual = parseFloat(results[0].moneda_virtual) - parseFloat(moneda_virtual_sumar);


    // Actualizar el dinero del usuario en la base de datos
    connection.query('UPDATE usuario SET dinero_real = ?, moneda_virtual = ? WHERE id = ?', [nuevo_dinero_real, nueva_moneda_virtual, idProducto], (updateError, updateResults) => {
      if (updateError) {
        console.error('Error al actualizar el dinero del usuario:', updateError);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

      if (updateResults.affectedRows === 0) {
        console.log('Usuario no encontrado');
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }

      console.log('Dinero del usuario actualizado con éxito');
      res.status(200).json({ message: 'Dinero del usuario actualizado exitosamente' });
    });
  });
}

const modificarDinero = async (req, res) => {
  const idProducto  = req.params.id;
  const dinero_real  = req.params.dinero_real;
  const moneda_virtual  = req.params.moneda_virtual; // suponiendo que el ID del producto se pasa como parámetro en la URL
  console.log(idProducto);
  connection.query('UPDATE usuario SET dinero_real = ?, moneda_virtual= ? WHERE id = ?', [dinero_real,moneda_virtual,idProducto], (error, results) => {
      if (error) {
          console.error('Error al modificar el estado del producto:', error);
          res.status(500).json({ error: 'Error interno del servidor' });
      } else if (results.affectedRows === 0) {
          console.log('Producto no encontrado');
          res.status(404).json({ message: 'Producto no encontrado' });
      } else {
          console.log('Estado del producto modificado con éxito');
          res.status(200).json({ message: 'Estado del producto modificado exitosamente' });
      }
  });
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
    cargarDinero,
    descontarDinero,
    editarUsuario,
    modificarDinero
    
}