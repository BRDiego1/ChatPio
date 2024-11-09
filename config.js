const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',      // Cambia esto si tu base de datos está en otro servidor
  user: 'root',     // Nombre de usuario de tu base de datos
  password: '', // Contraseña de tu base de datos
  database: 'piochat',  // Nombre de la base de datos a la que quieres conectarte
  port: 3306              // Cambia el puerto si es diferente al predeterminado
};

// Crear la conexión
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
