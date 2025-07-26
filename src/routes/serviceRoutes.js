const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Criar novo serviço
router.post('/', serviceController.create);

// Listar todos os serviços
router.get('/', serviceController.getAll);

// Buscar serviço por ID
router.get('/:id', serviceController.getById);

// Deletar serviço
router.delete('/:id', serviceController.delete);

module.exports = router;
