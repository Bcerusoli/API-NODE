const subcategoriaMarcaRepository = require('../repositories/subcategoriaMarca');

exports.getSubcategoriasMarca = async (req, res) => {
    try {
        const subcategoriasMarca = await subcategoriaMarcaRepository.getSubcategoriasMarca();
        res.status(200).json(subcategoriasMarca);
    } catch (error) {
        console.error('Error al obtener subcategorías de marca:', error);
        res.status(500).json({ message: 'Error al obtener subcategorías de marca', error });
    }
};

exports.getSubcategoriaMarcaById = async (req, res) => {
    const { id } = req.params;
    try {
        const subcategoriaMarca = await subcategoriaMarcaRepository.getSubcategoriaMarcaById(id);
        if (subcategoriaMarca) {
            res.status(200).json(subcategoriaMarca);
        } else {
            res.status(404).json({ message: 'Subcategoría de marca no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener subcategoría de marca:', error);
        res.status(500).json({ message: 'Error al obtener subcategoría de marca', error });
    }
};

exports.createSubcategoriaMarca = async (req, res) => {
    try {
        const nuevaSubcategoriaMarca = await subcategoriaMarcaRepository.createSubcategoriaMarca(req.body);
        res.status(201).json(nuevaSubcategoriaMarca);
    } catch (error) {
        console.error('Error al crear subcategoría de marca:', error);
        res.status(500).json({ message: 'Error al crear subcategoría de marca', error });
    }
};

exports.updateSubcategoriaMarca = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSubcategoriaMarca = await subcategoriaMarcaRepository.updateSubcategoriaMarca(id, req.body);
        if (updatedSubcategoriaMarca) {
            res.status(200).json(updatedSubcategoriaMarca);
        } else {
            res.status(404).json({ message: 'Subcategoría de marca no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar subcategoría de marca:', error);
        res.status(500).json({ message: 'Error al actualizar subcategoría de marca', error });
    }
};

exports.deleteSubcategoriaMarca = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await subcategoriaMarcaRepository.deleteSubcategoriaMarca(id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Subcategoría de marca no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar subcategoría de marca:', error);
        res.status(500).json({ message: 'Error al eliminar subcategoría de marca', error });
    }
};