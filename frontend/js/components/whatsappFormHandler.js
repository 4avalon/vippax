// js/components/whatsappFormHandler.js

document.getElementById("agendamento-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio automático do formulário

    // Pegar os dados do formulário
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const origem = document.getElementById("origem").value;
    const destino = document.getElementById("destino").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    // Criar o link dinâmico do WhatsApp
    const mensagemWhatsApp = `Olá, gostaria de fazer uma reserva!%0A
    Nome: ${nome}%0A
    Telefone: ${telefone}%0A
    E-mail: ${email}%0A
    Origem: ${origem}%0A
    Destino: ${destino}%0A
    Data: ${data}%0A
    Hora: ${hora}`;

    //laguna whats 5511964298683
    // whats 551933360108
    const numeroWhatsApp = "5511964298683"; // Substitua pelo número do WhatsApp desejado
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagemWhatsApp}`;

    // Abrir o WhatsApp com o link dinâmico
    window.open(linkWhatsApp, "_blank");
});
