const productoRepository = require('../repositories/producto');

exports.getProductos = async (req, res) => {
    try {
        const productos = await productoRepository.getProductos();
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};

exports.getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await productoRepository.getProductoById(id);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ message: 'Error al obtener producto', error });
    }
};

exports.createProducto = async (req, res) => {
    try {
        const nuevoProducto = await productoRepository.createProducto(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ message: 'Error al crear producto', error });
    }
};

exports.updateProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProducto = await productoRepository.updateProducto(id, req.body);
        if (updatedProducto) {
            res.status(200).json(updatedProducto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ message: 'Error al actualizar producto', error });
    }
};

exports.deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await productoRepository.deleteProducto(id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: 'Error al eliminar producto', error });
    }
};