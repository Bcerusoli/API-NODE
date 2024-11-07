const express = require('express');
const router = express.Router();
const subcategoriaMarcaController = require('../controllers/subcategoriaMarcaController');

router.get('/', subcategoriaMarcaController.getSubcategoriasMarca);
router.get('/:id', subcategoriaMarcaController.getSubcategoriaMarcaById);
router.post('/', subcategoriaMarcaController.createSubcategoriaMarca);
router.put('/:id', subcategoriaMarcaController.updateSubcategoriaMarca);
router.delete('/:id', subcategoriaMarcaController.deleteSubcategoriaMarca);

module.exports = router;