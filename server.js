var express = require('express');
var socket = require('socket.io');
var sql = require('./db.js');
const bodyParser = require('body-parser');
var app = express(); // Solo se declara una vez
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var server = app.listen(4000, function() {
    console.log('Connecting to Port 4000');
});

app.use(express.static('public'));
app.set('view engine', 'html');

const LoginRoutes = require('./public/M_par/Route/Ro_Login.js');
const RegistroRoutes = require('./public/M_par/Route/R_Registro.js');

app.use(LoginRoutes);
app.use(RegistroRoutes);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/registro', function(req, res) {
    res.sendFile(__dirname + '/public/registro.html');
});

app.get('/index', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
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