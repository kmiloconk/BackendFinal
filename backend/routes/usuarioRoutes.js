const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth');
const usuarioController = require('../controllers/usuarioController');

api.post('/usuario', usuarioController.createUsuario);
api.get('/usuarios', usuarioController.getUsuarios);
api.get('/usuario/search/:id', usuarioController.getUsuario);
api.delete('/usuario/delete/:id', usuarioController.deleteUsuario);
api.post('/login', usuarioController.login);
api.get('/checkToken', auth.auth, usuarioController.checkToken);
api.get('/logout', auth.auth, usuarioController.logout);

module.exports = api;