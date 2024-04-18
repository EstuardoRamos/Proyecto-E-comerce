
const { error } = require("console");
const multer = require('multer');
const cors= require("cors");
const connection = require('../db.js');
// Importar el modelo Usuario definido en Sequelize
const bcrypt = require('bcrypt');

/**
 * @param {Request} req
 * @param {Response} res
 */



const crearVenta = async (req, res) => {
    const newUser = req.body;
    const nombre= req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio_moneda = req.body.precio_moneda;
    const precio_dinero_real = req.body.precio_dinero_real;
    const idvendedor = req.body.idvendedor;
    const idestado = req.body.idestado;
    const tipo = req.body.tipo;
    const disponible = req.body.disponible;
    
    connection.query('INSERT INTO producto (nombre, descripcion, precio_moneda, precio_dinero_real,categoria, idvendedor, idestado, tipo, disponible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [newUser.nombre, newUser.descripcion, newUser.precio_moneda, newUser.precio_dinero_real,newUser.categoria, newUser.idvendedor, newUser.idestado, newUser.tipo,newUser.disponible], (error, results) => {
      if (error) {
        console.error('Error al insertar nuevo producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        console.log('Nuevo usuario insertado con éxito');
        res.status(201).json({ message: 'Usuario creado exitosamente' });
      }
    });

  }
  const modificarEstadoProducto = async (req, res) => {
    const idProducto  = req.params.id; // suponiendo que el ID del producto se pasa como parámetro en la URL
    console.log(idProducto);
    connection.query('UPDATE producto SET disponible = 0 WHERE id = ?', [idProducto], (error, results) => {
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
// producto.controllers.js

const listarProductos = (req, res) => {
    connection.query('SELECT * FROM producto where disponible=1', (error, results) => {
      if (error) {
        console.error('Error al obtener los productos:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      res.status(200).json(results);
    });
  };
  
  module.exports = {
    listarProductos
  };

  const listarProductosPorCategoria = (req, res) => {
    const categoria = req.params.categoria;
    connection.query('SELECT * FROM producto where categoria=?', [categoria], (error, results) => {
      if (error) {
        console.error('Error al obtener los productos:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      res.status(200).json(results);
    });
  };

  const listarProductosPorId = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM producto where id=?', [id], (error, results) => {
      if (error) {
        console.error('Error al obtener los productos:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      res.status(200).json(results);
    });
  };
  const listarProductosPorIdvendedor = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM producto where idvendedor=?', [id], (error, results) => {
      if (error) {
        console.error('Error al obtener los productos:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      res.status(200).json(results);
    });
  };
  
  module.exports = {
    listarProductos
  };
  
// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');  // Directorio donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);  // Nombre del archivo
    }
  });
const upload = multer({ storage: storage });
  

const guardarImagen = async (req, res) => {
  const imagePath = req.file.path;
  console.log(imagePath);
  const query = 'INSERT INTO productos (imagen) VALUES (?)';

  connection.query(query, [imagePath], (error, results) => {
      if (error) throw error;
      res.status(200).send('Imagen subida y guardada en la base de datos');
  });
}


  module.exports = {
    crearVenta,
    guardarImagen,
    listarProductos,
    listarProductosPorCategoria,
    listarProductosPorId,
    modificarEstadoProducto
  }