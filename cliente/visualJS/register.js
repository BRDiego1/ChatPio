document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
  
    // Realizar validación de los datos y registrar al usuario
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = 'cliente/visual/login.html'; // Redirigir al login después del registro
      } else {
        document.getElementById('register-message').textContent = data.message;
      }
    })
    .catch(err => {
      console.error('Error al registrar', err);
    });
  });
  