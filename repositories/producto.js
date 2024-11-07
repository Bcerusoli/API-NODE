const dbConnection = require('../dbConnection/postgresConnection');
let connection = null;

const getConnection = async () => {
    connection = connection || await dbConnection.connect();
    return connection;
};

const getProductos = async () => {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM Producto');
    return result.rows;
};

const getProductoById = async (id) => {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM Producto WHERE id = $1', [id]);
    return result.rows[0];
};

const createProducto = async (producto) => {
    const client = await getConnection();
    const result = await client.query(
        'INSERT INTO Producto (nombre, precio, imagen, stock, descripcion, id_subcategoria_marca, id_subcategoria_perfume) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [producto.nombre, producto.precio, producto.imagen, producto.stock, producto.descripcion, producto.id_subcategoria_marca, producto.id_subcategoria_perfume]
    );
    return result.rows[0];
};

const updateProducto = async (id, producto) => {
    const client = await getConnection();
    const result = await client.query(
        'UPDATE Producto SET nombre = $1, precio = $2, imagen = $3, stock = $4, descripcion = $5, id_subcategoria_marca = $6, id_subcategoria_perfume = $7 WHERE id = $8 RETURNING *',
        [producto.nombre, producto.precio, producto.imagen, producto.stock, producto.descripcion, producto.id_subcategoria_marca, producto.id_subcategoria_perfume, id]
    );
    return result.rows[0];
};

const deleteProducto = async (id) => {
    const client = await getConnection();
    const result = await client.query('DELETE FROM Producto WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};