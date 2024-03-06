async function tratarDados() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validando os dados
    if (username.trim() === '' || password.trim() === '') {
        alert('Preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch('/endpoint-de-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
            mode: "cors",
        });

        const data = await response.json();

        // Exibindo a resposta no console do navegador
        console.log(data);

        // Exibindo a resposta no HTML
        document.getElementById('response').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Erro ao enviar solicitação:', error);
    }
}
