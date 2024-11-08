const socket = io();

// Conexión con el servidor
socket.on('connect', () => {
  console.log('Conectado al servidor');
});

// Enviar mensaje
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = document.getElementById('m').value;
  socket.emit('chat message', message);
  document.getElementById('m').value = '';
});

// Recibir mensajes
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  document.getElementById('messages').appendChild(li);
});
