const dbConnection = require('../dbConnection/postgresConnection');
let connection = null;

const getConnection = async () => {
    connection = connection || await dbConnection.connect();
    return connection;
};

const getSubcategoriasMarca = async () => {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM SubcategoriaMarca');
    return result.rows;
};

const getSubcategoriaMarcaById = async (id) => {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM SubcategoriaMarca WHERE id = $1', [id]);
    return result.rows[0];
};

const createSubcategoriaMarca = async (subcategoriaMarca) => {
    const client = await getConnection();
    const result = await client.query(
        'INSERT INTO SubcategoriaMarca (nombre, id_categoria) VALUES ($1, $2) RETURNING *',
        [subcategoriaMarca.nombre, subcategoriaMarca.id_categoria]
    );
    return result.rows[0];
};

const updateSubcategoriaMarca = async (id, subcategoriaMarca) => {
    const client = await getConnection();
    const result = await client.query(
        'UPDATE SubcategoriaMarca SET nombre = $1, id_categoria = $2 WHERE id = $3 RETURNING *',
        [subcategoriaMarca.nombre, subcategoriaMarca.id_categoria, id]
    );
    return result.rows[0];
};

const deleteSubcategoriaMarca = async (id) => {
    const client = await getConnection();
    const result = await client.query('DELETE FROM SubcategoriaMarca WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
};

module.exports = {
    getSubcategoriasMarca,
    getSubcategoriaMarcaById,
    createSubcategoriaMarca,
    updateSubcategoriaMarca,
    deleteSubcategoriaMarca
};