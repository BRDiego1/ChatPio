const express = require('express');
const router = express.Router();
const db = require('../config'); // Aquí estamos importando la conexión a la base de datos desde 'config.js'

// Ruta de inicio de sesión
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error en el servidor');
      return;
    }

    if (results.length > 0) {
      res.send('Inicio de sesión exitoso');
    } else {
      res.send('Nombre de usuario o contraseña incorrectos');
    }
  });
});

module.exports = router;
