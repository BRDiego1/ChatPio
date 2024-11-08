document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    // Realizar validación aquí (por ejemplo, llamada al servidor para verificar las credenciales)
    
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Redirigir al chat si el inicio de sesión es exitoso
        window.location.href = 'cliente/visual/index.html';
      } else {
        document.getElementById('login-message').textContent = data.message;
      }
    })
    .catch(err => {
      console.error('Error al iniciar sesión', err);
    });
  });
  