const dbConnection = require('../dbConnection/postgresConnection');
let connection = null;

const getConnection = async () => {
    connection = connection || await dbConnection.connect();
    return connection;
};

const getUsuarios = async () => {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM Usuario');
    return result.rows;
};

const getUsuarioById = async (id) => {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM Usuario WHERE id = $1', [id]);
    return result.rows[0];
};

const getUsuarioByEmail = async (email) => {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM Usuario WHERE email = $1', [email]);
    return result.rows[0];
};

const createUsuario = async (usuario) => {
    const client = await getConnection();
    const result = await client.query(
        'INSERT INTO Usuario (nombre, email, contraseña, esadmin) VALUES ($1, $2, $3, $4) RETURNING *',
        [usuario.nombre, usuario.email, usuario.contraseña, usuario.esadmin]
    );
    return result.rows[0];
};

const updateUsuario = async (id, usuario) => {
    const client = await getConnection();
    const result = await client.query(
        'UPDATE Usuario SET nombre = $1, email = $2, contraseña = $3, esadmin = $4 WHERE id = $5 RETURNING *',
        [usuario.nombre, usuario.email, usuario.contraseña, usuario.esadmin, id]
    );
    return result.rows[0];
};

const deleteUsuario = async (id) => {
    const client = await getConnection();
    const result = await client.query('DELETE FROM Usuario WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    getUsuarioByEmail,
    createUsuario,
    updateUsuario,
    deleteUsuario
};