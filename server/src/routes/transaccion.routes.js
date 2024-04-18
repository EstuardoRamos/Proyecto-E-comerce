const express = require('express');

const transaccionController = require("../controlers/transaccion.controllers");
const router = express.Router();

//Rutas funcionales
router.post('/transaccion-venta', transaccionController.crearTransaccion);


module.exports= router;
