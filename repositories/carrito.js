const dbConnection = require('../dbConnection/postgresConnection');
let connection = null;

const getConnection = async () => {
    connection = connection || await dbConnection.connect();
    return connection;
};

const getCarritos = async () => {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM Carrito');
    return result.rows;
};

const getCarritoById = async (id) => {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM Carrito WHERE id = $1', [id]);
    return result.rows[0];
};

const createCarrito = async (carrito) => {
    const client = await getConnection();
    const result = await client.query(
        'INSERT INTO Carrito (id_cliente) VALUES ($1) RETURNING *',
        [carrito.id_cliente]
    );
    return result.rows[0];
};

const updateCarrito = async (id, carrito) => {
    const client = await getConnection();
    const result = await client.query(
        'UPDATE Carrito SET id_cliente = $1 WHERE id = $2 RETURNING *',
        [carrito.id_cliente, id]
    );
    return result.rows[0];
};

const deleteCarrito = async (id) => {
    const client = await getConnection();
    const result = await client.query('DELETE FROM Carrito WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
};

module.exports = {
    getCarritos,
    getCarritoById,
    createCarrito,
    updateCarrito,
    deleteCarrito
};