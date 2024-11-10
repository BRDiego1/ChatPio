var express = require('express');
var socket = require('socket.io');
var session = require('express-session'); // Importa el módulo para gestionar sesiones
var { registrarUsuario } = require('./registro');
var { iniciarSesion } = require('./login');
var app = express();

// Configuración del servidor
var server = app.listen(4000, function() {
    console.log('Connecting to Port 4000');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración de la sesión
app.use(session({
    secret: 'mi_clave_secreta', // Cambia esto por una clave secreta
    resave: false,
    saveUninitialized: true
}));

// Ruta para el Login
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/login.html');
});

// Ruta para procesar el inicio de sesión (POST)
app.post('/login', async function(req, res) {
    const { username, password } = req.body;

    try {
        const message = await iniciarSesion(username, password);

        // Almacena el nombre de usuario en la sesión
        req.session.username = username;

        res.status(200).json({ success: true, message });
    } catch (error) {
        res.status(401).json({ success: false, message: error });
    }
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
    // Verifica si el usuario está autenticado (si existe un nombre en la sesión)
    if (req.session.username) {
        res.sendFile(__dirname + '/views/index.html');
    } else {
        res.redirect('/'); // Si no está autenticado, redirige al login
    }
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
