// Suponiendo que usas Node.js con Socket.io

const io = require('socket.io')(server);

// Al recibir un evento de logout
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('logout', (data) => {
        console.log(data.message);  // 'El usuario ha cerrado sesión'
        
        // Realiza las acciones necesarias para cerrar sesión en el servidor, como eliminar el usuario de la sesión o base de datos
        socket.disconnect();  // Desconectar al usuario

        // Si es necesario, envía una notificación al frontend para que se realicen otros cambios
    });
});
