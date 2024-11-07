const administradorRepository = require('../repositories/administrador');

exports.getAdministradores = async (req, res) => {
    try {
        const administradores = await administradorRepository.getAdministradores();
        res.status(200).json(administradores);
    } catch (error) {
        console.error('Error al obtener administradores:', error);
        res.status(500).json({ message: 'Error al obtener administradores', error });
    }
};

exports.getAdministradorById = async (req, res) => {
    const { id } = req.params;
    try {
        const administrador = await administradorRepository.getAdministradorById(id);
        if (administrador) {
            res.status(200).json(administrador);
        } else {
            res.status(404).json({ message: 'Administrador no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener administrador:', error);
        res.status(500).json({ message: 'Error al obtener administrador', error });
    }
};

exports.createAdministrador = async (req, res) => {
    try {
        const nuevoAdministrador = await administradorRepository.createAdministrador(req.body);
        res.status(201).json(nuevoAdministrador);
    } catch (error) {
        console.error('Error al crear administrador:', error);
        res.status(500).json({ message: 'Error al crear administrador', error });
    }
};

exports.updateAdministrador = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedAdministrador = await administradorRepository.updateAdministrador(id, req.body);
        if (updatedAdministrador) {
            res.status(200).json(updatedAdministrador);
        } else {
            res.status(404).json({ message: 'Administrador no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar administrador:', error);
        res.status(500).json({ message: 'Error al actualizar administrador', error });
    }
};

exports.deleteAdministrador = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await administradorRepository.deleteAdministrador(id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Administrador no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar administrador:', error);
        res.status(500).json({ message: 'Error al eliminar administrador', error });
    }
};