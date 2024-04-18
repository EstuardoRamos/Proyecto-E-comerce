const express = require('express');

const usuarioController = require("../controlers/usuario.controlers");

const router = express.Router();

//Rutas funcionales
router.post('/login', usuarioController.login);
router.post('/new-user', usuarioController.crearUsuario);
router.put('/cargar-dinero/:id/:dinero_real/:moneda_virtual', usuarioController.cargarDinero);
router.put('/descontar-dinero/:id/:dinero_real/:moneda_virtual', usuarioController.descontarDinero);


module.exports= router;
