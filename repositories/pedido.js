const dbConnection = require('../dbConnection/postgresConnection');
let connection = null;

const getConnection = async () => {
    connection = connection || await dbConnection.connect();
    return connection;
};

const getPedidos = async () => {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM Pedido');
    return result.rows;
};

const getPedidoById = async (id) => {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM Pedido WHERE id = $1', [id]);
    return result.rows[0];
};

const createPedido = async (pedido) => {
    const client = await getConnection();
    const result = await client.query(
        'INSERT INTO Pedido (fecha, total, id_cliente, id_carrito) VALUES ($1, $2, $3, $4) RETURNING *',
        [pedido.fecha, pedido.total, pedido.id_cliente, pedido.id_carrito]
    );
    return result.rows[0];
};

const updatePedido = async (id, pedido) => {
    const client = await getConnection();
    const result = await client.query(
        'UPDATE Pedido SET fecha = $1, total = $2, id_cliente = $3, id_carrito = $4 WHERE id = $5 RETURNING *',
        [pedido.fecha, pedido.total, pedido.id_cliente, pedido.id_carrito, id]
    );
    return result.rows[0];
};

const deletePedido = async (id) => {
    const client = await getConnection();
    const result = await client.query('DELETE FROM Pedido WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
};

module.exports = {
    getPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido
};