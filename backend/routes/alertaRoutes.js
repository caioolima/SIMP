const express = require('express');
const router = express.Router();

// Certifique-se de que você está importando o controller corretamente
const alertaController = require('../controllers/alertaController');

// Definir a rota GET para listar os alertas
router.get('/', alertaController.getAlertas);

// Definir a rota POST para criar um alerta
router.post('/', alertaController.criarOuAtualizarAlerta);

// Rota para listar alertas com status "em alerta"
router.get('/em-alerta', alertaController.acharEmAlerta);

// Rota para listar alertas com status "crítico"
router.get('/criticos', alertaController.acharEmCritico);

// Rota para buscar um alerta pelo nome
router.get('/nome/:nomePoste', alertaController.acharAlertaPorNome); // Nova rota


module.exports = router;
