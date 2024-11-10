document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario: username, email: email, contraseña: password })
        });

        const result = await response.text();
        alert(result);

        if (response.status === 200) {
            // Redirigir a login o página de inicio después de un registro exitoso
            window.location.href = '/';
        } else {
            // Si hay error, mostrar el mensaje de error
            document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('errorText').innerText = result;
        }
    });
});
