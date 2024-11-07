const usuarioRepository = require('../repositories/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioRepository.getUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

exports.getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioRepository.getUsuarioById(id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario', error });
    }
};

exports.createUsuario = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.contraseña, 10);
        const nuevoUsuario = await usuarioRepository.createUsuario({
            ...req.body,
            contraseña: hashedPassword
        });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
};

exports.updateUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUsuario = await usuarioRepository.updateUsuario(id, req.body);
        if (updatedUsuario) {
            res.status(200).json(updatedUsuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
};

exports.deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await usuarioRepository.deleteUsuario(id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
};

exports.login = async (req, res) => {
    const { email, contraseña } = req.body;
    try {
        const usuario = await usuarioRepository.getUsuarioByEmail(email);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};