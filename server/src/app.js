const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors= require("cors");
const app = express();
const port = 3000;

const connection = require('./db.js');



//console.log(require.resolve('sequelize'));

// Rutas para las diferentes operaciones CRUD
app.use(bodyParser.json())
app.use(cors())
//app.use('/api', require('./routes/usuario.routes.js'))
app.use('/api', require('./routes/producto.routes.js'))
app.use('/api', require('./routes/usuario.routes.js'))
app.use('/api', require('./routes/transaccion.routes.js'))


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Directorio donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Nombre del archivo
  }
});
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('productImage'), (req, res) => {
  const imagePath = req.file.path;
  const query = 'INSERT INTO productos (imagen) VALUES (?)';
  
  connection.query(query, [imagePath], (error, results) => {
    if (error) {
      console.error('Error al insertar la imagen:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    const insertedId = results.insertId;  // Obtiene el ID del registro insertado

    if (!insertedId) {
      return res.status(500).json({ error: 'No se pudo obtener el ID del registro insertado' });
    }

    res.status(200).json({ message: 'Imagen subida y guardada en la base de datos', id: insertedId });
  });
});


app.use(bodyParser.urlencoded({ extended: true })),



app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
module.exports = { connection };