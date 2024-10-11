const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controles/usuarios');

router.post('/registrar', registrarUsuario);

router.post('/login', loginUsuario);

module.exports = router;
