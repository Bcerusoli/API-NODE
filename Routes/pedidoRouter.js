const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../middleware/auth');

router.get('/', auth, pedidoController.getPedidos);
router.get('/:id', auth, pedidoController.getPedidoById);
router.post('/', auth, pedidoController.createPedido);
router.put('/:id', auth, pedidoController.updatePedido);
router.delete('/:id', auth, pedidoController.deletePedido);

module.exports = router;