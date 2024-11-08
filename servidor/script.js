// Conectar al servidor de Socket.IO
const socket = io();  // Se conecta al servidor automáticamente

// Elementos del DOM
const form = document.getElementById('form');
const input = document.getElementById('m');
const messagesList = document.getElementById('messages');

// Enviar mensaje cuando el formulario sea enviado
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = input.value.trim();
  if (message) {
    // Emitir el mensaje al servidor
    socket.emit('chat message', message);
    input.value = '';  // Limpiar el campo de entrada
  }
});

// Escuchar el evento 'chat message' para agregar el mensaje a la lista
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight; // Hacer scroll hasta el último mensaje
});
