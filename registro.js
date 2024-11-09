const bcrypt = require('bcrypt');
const sql = require('./db.js');

// Función para registrar un nuevo usuario
const registrarUsuario = async (username, email, password) => {
    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Consulta SQL para insertar el usuario
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

        return new Promise((resolve, reject) => {
            sql.query(query, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error al registrar usuario:', err);
                    reject('Error al registrar el usuario');
                } else {
                    resolve('Usuario registrado exitosamente');
                }
            });
        });
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
        throw new Error('Error en el servidor');
    }
};

module.exports = { registrarUsuario };
