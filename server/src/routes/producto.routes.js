const express = require('express');

const productoController = require("../controlers/producto.controlers");
const upload = require('../controlers/producto.controlers').upload; 
const router = express.Router();

//Rutas funcionales

router.post('/new-ventas', productoController.crearVenta);
//router.post('/upload', productoController.guardarImagen);
//router.post('/upload', upload.single('imagen'), guardarImagen);
router.get('/listar-productos', productoController.listarProductos);
router.get('/listar-productos-categoria/:categoria', productoController.listarProductosPorCategoria);
router.get('/listar-productos-id/:id', productoController.listarProductosPorId);
router.put('/vender-producto/:id', productoController.modificarEstadoProducto);
router.post('/get-imagen', productoController.guardarImagen);
router.post('/comprar', productoController.guardarImagen);


module.exports= router;