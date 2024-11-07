const dbConnection = require('../dbConnection/postgresConnection');
let connection = null;

const getConnection = async () => {
    connection = connection || await dbConnection.connect();
    return connection;
};

const getAdministradores = async () => {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM Administrador');
    return result.rows;
};

const getAdministradorById = async (id) => {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM Administrador WHERE id = $1', [id]);
    return result.rows[0];
};

const createAdministrador = async (administrador) => {
    const client = await getConnection();
    const result = await client.query(
        'INSERT INTO Administrador (id) VALUES ($1) RETURNING *',
        [administrador.id]
    );
    return result.rows[0];
};

const updateAdministrador = async (id, administrador) => {
    const client = await getConnection();
    const result = await client.query(
        'UPDATE Administrador SET id = $1 WHERE id = $2 RETURNING *',
        [administrador.id, id]
    );
    return result.rows[0];
};

const deleteAdministrador = async (id) => {
    const client = await getConnection();
    const result = await client.query('DELETE FROM Administrador WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
};

module.exports = {
    getAdministradores,
    getAdministradorById,
    createAdministrador,
    updateAdministrador,
    deleteAdministrador
};