const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',     // Cambia esto a la IP de tu base de datos si es necesario
    user: 'root',
    password: '',
    database: 'piochat'
});

db.connect(function(err) {
    if (err) {
        console.log('Error de conexión: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos.');
});

module.exports = db;
