// routes/formRoutes.js
const express = require('express');
const router = express.Router();
const { listarFormularios, criarFormulario } = require('../controllers/formController');

// Rota para listar todos os formulários
router.get('/', listarFormularios);

// Rota para criar um novo formulário
router.post('/', criarFormulario);

module.exports = router;
