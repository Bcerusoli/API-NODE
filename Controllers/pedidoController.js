const pedidoRepository = require('../repositories/pedido');

exports.getPedidos = async (req, res) => {
    try {
        const pedidos = await pedidoRepository.getPedidos();
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        res.status(500).json({ message: 'Error al obtener pedidos', error });
    }
};

exports.getPedidoById = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await pedidoRepository.getPedidoById(id);
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener pedido:', error);
        res.status(500).json({ message: 'Error al obtener pedido', error });
    }
};

exports.createPedido = async (req, res) => {
    try {
        const nuevoPedido = await pedidoRepository.createPedido(req.body);
        res.status(201).json(nuevoPedido);
    } catch (error) {
        console.error('Error al crear pedido:', error);
        res.status(500).json({ message: 'Error al crear pedido', error });
    }
};

exports.updatePedido = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPedido = await pedidoRepository.updatePedido(id, req.body);
        if (updatedPedido) {
            res.status(200).json(updatedPedido);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar pedido:', error);
        res.status(500).json({ message: 'Error al actualizar pedido', error });
    }
};

exports.deletePedido = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await pedidoRepository.deletePedido(id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar pedido:', error);
        res.status(500).json({ message: 'Error al eliminar pedido', error });
    }
};