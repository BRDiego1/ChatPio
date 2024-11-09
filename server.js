var express = require('express');
var socket = require('socket.io');
var sql = require('./db.js');
var registro = require('./registro.js'); // Importar el archivo de registro
var app = express();

app.use(express.json()); // Para manejar JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); // Para manejar datos de formulario

// Configuración del servidor
var server = app.listen(4000, function() {
    console.log('Connecting to Port 4000');
});

app.use(express.static('public'));
app.set('view engine', 'html'); // Usar HTML en las vistas

// Ruta para el Login
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/login.html');
});

// Ruta para el Registro (GET para mostrar la página)
app.get('/registro', function(req, res) {
    res.sendFile(__dirname + '/views/registro.html');
});

// Ruta para el Registro (POST para procesar los datos)
app.post('/registro', async function(req, res) {
    const { username, email, password } = req.body;

    try {
        const mensaje = await registro.registrarUsuario(username, email, password);
        res.status(201).json({ success: true, message: mensaje });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Ruta para la página principal (Index)
app.get('/index', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

var io = socket(server);

io.on('connection', function(socket) {
    console.log("Hay una conexion", socket.id);

    socket.on('chat', function(data) {
        console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
});
