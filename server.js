var express = require('express');
var socket = require('socket.io');
var { registrarUsuario } = require('./registro');
var app = express();
var server = app.listen(4000, function(){
    console.log('Connecting to Port 4000');
});

app.use(express.static('public'));
app.set('view engine', 'html'); // Para usar HTML en las vistas

// Ruta para el Login
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/login.html');
});

// Ruta para el Registro
app.get('/registro', function(req, res) {
    res.sendFile(__dirname + '/views/registro.html');
});

// Ruta para la página principal (Index)
app.get('/index', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

var io = socket(server);

io.on('connection', function(socket){
    console.log("Hay una conexion", socket.id);

    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
