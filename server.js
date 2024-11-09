const express = require('express');
const WebSocket = require('ws');
const mysql = require('mysql2');

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',      // Cambia esto si tu base de datos está en otro servidor
  user: 'root',           // Nombre de usuario de tu base de datos
  password: '',           // Contraseña de tu base de datos
  database: 'piochat',    // Nombre de la base de datos a la que quieres conectarte
  port: 3306              // Cambia el puerto si es diferente al predeterminado
};

// Crear la conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

module.exports = connection;

// Crear una instancia de Express
const app = express();

// Dirección IP local de tu máquina
const LOCAL_IP = '192.168.1.72';  // Reemplaza con tu IP local

// Configurar la carpeta 'public' para servir archivos estáticos
app.use(express.static('public'));

// Configurar el puerto donde estará corriendo el servidor HTTP (Express)
const server = app.listen(5000, LOCAL_IP, () => {
  console.log(`Servidor Express corriendo en http://${LOCAL_IP}:5000`);
});

// Crear un servidor WebSocket que use el servidor HTTP de Express
const wss = new WebSocket.Server({ server });

// Manejar conexiones WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente WebSocket conectado');

  ws.on('message', (message) => {
    console.log('Mensaje recibido:', message);
    ws.send('Mensaje recibido: ' + message);
  });

  ws.send('Bienvenido al servidor WebSocket');
});

// Ruta principal que redirige a 'client.html'
app.get('/', (req, res) => {
  res.redirect('./public/login.html');
});
