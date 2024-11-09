const express = require('express');
const WebSocket = require('ws');


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
