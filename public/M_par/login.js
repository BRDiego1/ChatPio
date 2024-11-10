document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('../login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario: username, contraseña: password })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Redireccionar a la página de inicio
            window.location.href = data.redirectUrl;  // '/inicio' o cualquier otra ruta de inicio
        } else {
            document.getElementById('error-message').style.display = 'block';
            console.log(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
