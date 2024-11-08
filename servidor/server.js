const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const os = require('os');

// Crear la aplicación Express
const app = express();

// Crear servidor HTTP
const server = http.createServer(app);

// Configurar Socket.IO
const io = socketIo(server);

// Configuración para servir archivos estáticos desde el directorio 'cliente/visual'
app.use(express.static('cliente/visual'));
app.use('/css', express.static('cliente/css'));
app.use('/visualJS', express.static('cliente/visualJS'));

// Conectar a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'piochat',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

// Variable en memoria para almacenar los mensajes en tiempo real
let messages = [];

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Enviar el historial de mensajes a los nuevos usuarios
  socket.emit('previous messages', messages);

  // Registrar un nuevo usuario
  socket.on('register', (data) => {
    const { username, password } = data;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        socket.emit('register response', { status: 'error', message: 'El usuario ya existe' });
        return;
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
          if (err) throw err;
          socket.emit('register response', { status: 'success', message: 'Usuario registrado exitosamente' });
        });
      });
    });
  });

  // Loguear usuario
  socket.on('login', (data) => {
    const { username, password } = data;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        socket.emit('login response', { status: 'error', message: 'Usuario no encontrado' });
        return;
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (!isMatch) {
          socket.emit('login response', { status: 'error', message: 'Contraseña incorrecta' });
          return;
        }

        socket.emit('login response', { status: 'success', message: 'Login exitoso' });
      });
    });
  });

  // Recibir mensajes y enviarlos a todos los clientes conectados
  socket.on('chat message', (msg, userId) => {
    if (messages.length >= 50) {
      messages.shift(); // Limitar a 50 mensajes
    }

    // Guardar mensaje solo en memoria
    messages.push({ userId, msg });
    io.emit('chat message', msg);
  });

  // Desconexión del usuario
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Obtener la IP de la máquina
let ipAddress = '';
const networkInterfaces = os.networkInterfaces();
for (const interfaceName in networkInterfaces) {
  const interfaceInfo = networkInterfaces[interfaceName];
  for (const iface of interfaceInfo) {
    if (!iface.internal && iface.family === 'IPv4') {
      ipAddress = iface.address;
      break;
    }
  }
  if (ipAddress) break;
}

// Definir el puerto en el que el servidor escuchará
const port = process.env.PORT || 3000;

// Iniciar el servidor
server.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://${ipAddress}:${port}`);
});
