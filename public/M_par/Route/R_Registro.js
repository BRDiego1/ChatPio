const express = require('express');
const bcrypt = require('bcryptjs');
var db = require('../../../db');
const router = express.Router();

// Ruta para el registro de usuario
router.post('/register', async (req, res) => {
    const { usuario, email, contraseña } = req.body;

    if (!usuario || !email || !contraseña) {
        return res.status(400).send('Por favor, llena todos los campos.');
    }

    // Verificar si el nombre de usuario o el correo electrónico ya existen
    db.query('SELECT * FROM usuarios WHERE usuario = ? OR email = ?', [usuario, email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al verificar datos.');
        }

        if (result.length > 0) {
            return res.status(400).send('El nombre de usuario o el correo electrónico ya están registrados.');
        }

        // Generar el hash de la contraseña
        bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al generar la contraseña.');
            }

            // Obtener la fecha y hora actuales en formato ISO
            const fechaRegistro = new Date().toISOString();

            // Inserción en la base de datos, incluyendo fecha_registro
            db.query('INSERT INTO usuarios (usuario, email, contraseña, fecha_registro) VALUES (?, ?, ?, ?)', 
                [usuario, email, hashedPassword, fechaRegistro], 
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Error al registrar usuario.');
                    }
                    res.send('Usuario registrado correctamente.');
                });
        });
    });
});

module.exports = router;
