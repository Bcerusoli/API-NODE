const carritoRepository = require('../repositories/carrito');

exports.getCarritos = async (req, res) => {
    try {
        const carritos = await carritoRepository.getCarritos();
        res.status(200).json(carritos);
    } catch (error) {
        console.error('Error al obtener carritos:', error);
        res.status(500).json({ message: 'Error al obtener carritos', error });
    }
};

exports.getCarritoById = async (req, res) => {
    const { id } = req.params;
    try {
        const carrito = await carritoRepository.getCarritoById(id);
        if (carrito) {
            res.status(200).json(carrito);
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener carrito:', error);
        res.status(500).json({ message: 'Error al obtener carrito', error });
    }
};

exports.createCarrito = async (req, res) => {
    try {
        const nuevoCarrito = await carritoRepository.createCarrito(req.body);
        res.status(201).json(nuevoCarrito);
    } catch (error) {
        console.error('Error al crear carrito:', error);
        res.status(500).json({ message: 'Error al crear carrito', error });
    }
};

exports.updateCarrito = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCarrito = await carritoRepository.updateCarrito(id, req.body);
        if (updatedCarrito) {
            res.status(200).json(updatedCarrito);
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar carrito:', error);
        res.status(500).json({ message: 'Error al actualizar carrito', error });
    }
};

exports.deleteCarrito = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await carritoRepository.deleteCarrito(id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar carrito:', error);
        res.status(500).json({ message: 'Error al eliminar carrito', error });
    }
};