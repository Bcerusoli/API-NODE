const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const auth = require('../middleware/auth');

router.get('/', auth, carritoController.getCarritos);
router.get('/:id', auth, carritoController.getCarritoById);
router.post('/', auth, carritoController.createCarrito);
router.put('/:id', auth, carritoController.updateCarrito);
router.delete('/:id', auth, carritoController.deleteCarrito);

module.exports = router;