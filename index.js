require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const dbConnection = require('./dbConnection/postgresConnection'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var corsOptions = {
    origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

app.use(express.static('public'));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

// Middleware para validación de errores en JSON
app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        res.status(400).json({
            msg: 'Error en el JSON'
        });
    } else {
        next();
    }
});


const usuarioRouter = require('./Routes/usuarioRouter');
const clienteRouter = require('./Routes/clienteRouter');
const administradorRouter = require('./Routes/administradorRouter');
const detalleRouter = require('./Routes/detalleRouter');
const PedidoRouter = require('./Routes/pedidoRouter');
const carritoRouter = require('./Routes/carritoRouter');
const productoRouter = require('./Routes/productoRouter');
const subcategoriaPerfumeRouter = require('./Routes/subcategoriaPerfumeRouter');
const subcategoriaMarcaRouter = require('./Routes/subcategoriaMarcaRouter');
const categoriaRouter = require('./Routes/categoriaRouter');

app.use('/api/usuario', usuarioRouter);
app.use('/api/cliente', clienteRouter);
app.use('/api/administrador', administradorRouter);
app.use('/api/detalle', detalleRouter);
app.use('/api/pedido', PedidoRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/producto', productoRouter); 
app.use('/api/subcategoriaPerfume', subcategoriaPerfumeRouter);
app.use('/api/subcategoriaMarca', subcategoriaMarcaRouter);
app.use('/api/categoria', categoriaRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});