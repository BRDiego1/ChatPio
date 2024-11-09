var connection = require('./db');
var bcrypt = require('bcrypt');
var saltRounds = 10; // Número de rondas para el hash

function registrarUsuario(nombre, email, password, callback) {
    // Encriptamos la contraseña antes de insertarla en la base de datos
    bcrypt.hash(password, saltRounds, function(err, hashedPassword) {
        if (err) {
            callback(err, null);
            return;
        }

        // Ahora insertamos el usuario con la contraseña encriptada
        var query = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';
        
        connection.query(query, [nombre, email, hashedPassword], function(err, result) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    });
}

module.exports = {
    registrarUsuario
};
