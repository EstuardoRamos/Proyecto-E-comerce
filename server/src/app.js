const express = require('express');
const app = express();
const port = 3000;

const connection = require('./db.js');

// Rutas para las diferentes operaciones CRUD

// GET /usuarios
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuario', (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(results);
    }
  });
});

// POST /usuarios
app.post('/new-user', (req, res) => {
  const newUser = req.body;
  
  connection.query('INSERT INTO usuario (nombre, username, password, dinero_real, moneda_virtual, rol, estado) VALUES (?, ?, ?, ?, ?, ?, ?)', [newUser.nombre, newUser.username, newUser.password, newUser.dinero_real, newUser.moneda_virtual, newUser.rol, newUser.estado], (error, results) => {
    if (error) {
      console.error('Error al insertar nuevo usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Nuevo usuario insertado con éxito');
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    }
  });
  
});

// ...

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
