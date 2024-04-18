const bcrypt = require('bcrypt');
const connection = require('../db.js');

/**
 * @param {Request} req
 * @param {Response} res
 */

const crearTransaccion = async (req, res) => {
    const newUser = req.body;
    const tipo= req.body.tipo;
    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const fecha =fechaActual;
    const idcomprador = req.body.idcomprador;
    const idvendedor = req.body.idvendedor;
    const idproducto = req.body.idproducto;
    const monto_dinero_real = req.body.precio_dinero_real;
    const monto_moneda_sistema = req.body.monto_moneda_sistema;
    const idestado = req.body.idestado;
    const categoria = req.body.categoria;
    
    
    connection.query('INSERT INTO transacción (tipo, fecha, idcomprador, idvendedor, idproducto, monto_moneda_sistema, monto_dinero_real, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [newUser.tipo, fechaActual, newUser.idcomprador, newUser.idvendedor,newUser.idproducto, newUser.monto_moneda_sistema, newUser.monto_dinero_real, newUser.categoria ], (error, results) => {
      if (error) {
        console.error('Error al insertar nuevo transacción:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        console.log('Nuevo transaccion insertado con éxito');
        res.status(201).json({ message: 'transaccion creado exitosamente' });
      }
    });

  }


  const listarTransaccionPorIdVendedor = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM transaccion where idvendedor=?', [id], (error, results) => {
      if (error) {
        console.error('Error al obtener los productos:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      res.status(200).json(results);
    });
  };

  const listarTransaccionPorIdComprador = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM transacción where idcomprador=?', [id], (error, results) => {
      if (error) {
        console.error('Error al obtener los transasccion:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      res.status(200).json(results);
    });
  };

  module.exports = {
    crearTransaccion,
    listarTransaccionPorIdComprador,
    listarTransaccionPorIdVendedor
    
}