// js/components/formHandler.js
document.getElementById("agendamento-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o recarregamento da página

    const aceiteTermos = document.getElementById('aceite-termos');
    if (!aceiteTermos.checked) {
        alert('Você deve aceitar os termos e condições antes de enviar.');
        return;
    }
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Desativa o botão para evitar múltiplos cliques
    submitButton.textContent = 'Enviando...'; // Muda o texto do botão enquanto envia

    const formData = new FormData(this);
    const data = {
        nome: formData.get('nome'),
        telefone: formData.get('telefone'),
        email: formData.get('email'),
        origem: formData.get('origem'),
        destino: formData.get('destino'),
        data: formData.get('data'),
        hora: formData.get('hora')
    };



    try {
        // Atualize a URL para garantir que o front-end aponte corretamente para o back-end
        const response = await fetch('http://localhost:3000/reserva', { // Altere aqui
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Certifique-se de que os dados estão em formato JSON
        });

        const result = await response.json();

        if (response.ok) {
            alert('Reserva criada com sucesso!');
        } else {
            alert('Erro ao criar a reserva: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar a reserva:', error);
        alert('Erro ao enviar a reserva. Tente novamente mais tarde.');
    } finally {
        submitButton.disabled = false; // Reativa o botão
        submitButton.textContent = 'Reservar Agora'; // Restaura o texto original do botão
    }




});
