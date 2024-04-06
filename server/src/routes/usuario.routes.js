const express = require('express');

const usuarioController = require("../controllers/Usuario.controller");

const router = express.Router();

//Rutas funcionales
router.post('/login', usuarioController.login);
router.post('/new-user', usuarioController.crearUsuario);



