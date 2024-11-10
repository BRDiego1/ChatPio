const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../../../db'); // Importamos la conexión a la base de datos
const router = express.Router();

// Ruta para el login de usuario
router.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;
    console.log(`Usuario: ${usuario}, Contraseña: ${contraseña}`); // Esto te ayudará a ver los valores recibidos.
    
    if (!usuario || !contraseña) {
        return res.status(400).send('Por favor, llena todos los campos.');
    }
    // Resto del código...


    db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor.');
        }

        if (result.length === 0) {
            return res.status(400).send('Usuario no encontrado.');
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(contraseña, user.contraseña);

        if (!isMatch) {
            return res.status(400).send('Contraseña incorrecta.');
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso.', redirectUrl: '../../index.html' });
    });
});

module.exports = router;
