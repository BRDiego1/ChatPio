var express = require('express');
var socket = require('socket.io');
var { registrarUsuario } = require('./registro'); // Importar la función de registro
var app = express();

// Configuración del servidor
var server = app.listen(4000, function() {
    console.log('Connecting to Port 4000');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta para el Login
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/login.html');
});

// Ruta para mostrar el formulario de Registro
app.get('/registro', function(req, res) {
    res.sendFile(__dirname + '/views/registro.html');
});

// Ruta para procesar el registro de usuario (POST)
app.post('/registro', async function(req, res) {
    const { username, email, password } = req.body;

    try {
        const message = await registrarUsuario(username, email, password);
        res.status(201).json({ success: true, message });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
});

// Ruta para la página principal (Index)
app.get('/index', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

var io = socket(server);

io.on('connection', function(socket) {
    console.log("Usuario Conectado", socket.id);

    socket.on('chat', function(data) {
        console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
});
