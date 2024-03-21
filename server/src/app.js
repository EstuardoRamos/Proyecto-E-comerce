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
app.post('/usuarios', (req, res) => {
  const usuario = req.body;
  connection.query('INSERT INTO usuario SET ?', usuario, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send(result);
    }
  });
});

// ...

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
