// ==========================
// 1. Variáveis Globais
// ==========================
// Definição do tempo fixo para rolar entre seções (300 ms)
let scrollDuration = 300;

// ==========================
// 2. Função de Alternar o Menu no Modo Mobile
// ==========================
function toggleMenu() {
    var menu = document.getElementById("menu-list");
    var menuIcon = document.getElementById("menu-icon"); // Ícone de hambúrguer

    // Alterna a classe "active" para abrir e fechar o menu
    menu.classList.toggle("active");
    menuIcon.classList.toggle("open");  // Alterna o estilo do ícone

    // Muda o ícone de hambúrguer para "X"
    if (menuIcon.classList.contains("open")) {
        menuIcon.innerHTML = "&nbsp;&times;&nbsp;";
        console.log("Menu aberto");
    } else {
        menuIcon.innerHTML = "&#9776;";  // Volta ao ícone de hambúrguer
        console.log("Menu fechado");
    }
}

// ==========================
// 3. Função de Aplicar Classe 'Scrolled' ao Rolar
// ==========================
window.onscroll = function() {
    var menu = document.getElementById("menu");
    if (window.innerWidth > 768) {  // Apenas em telas grandes
        if (window.pageYOffset > 100) {
            menu.classList.add("scrolled");
            console.log("Menu rolado - classe 'scrolled' adicionada");
        } else {
            menu.classList.remove("scrolled");
            console.log("Menu no topo - classe 'scrolled' removida");
        }
    } else {
        // Remove a classe 'scrolled' em telas pequenas
        menu.classList.remove("scrolled");
        console.log("Mobile - classe 'scrolled' removida");
    }
};

// ==========================
// 4. Função para Fechar o Menu no Mobile ao Clicar em um Link
// ==========================
document.querySelectorAll("#menu-list li a").forEach(function(link) {
    link.addEventListener("click", function() {
        var menu = document.getElementById("menu-list");
        var menuIcon = document.getElementById("menu-icon"); // Ícone de hambúrguer
        menuIcon.classList.remove("open");  // Remove o estilo 'open'
        menu.classList.remove("active");  // Fecha o menu removendo a classe 'active'

        if (window.innerWidth <= 768) {  // Fechar o menu em telas pequenas
            menuIcon.innerHTML = "&#9776;";  // Volta ao ícone de hambúrguer
            console.log("Link clicado - Menu fechado no mobile");
        } else {
            console.log("Link clicado - Não fechou o menu (desktop)");
        }
    });
});

// ==========================
// 5. Função para Rolar Suavemente com Tempo Fixo
// ==========================
function smoothScrollFixedTime(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = scrollDuration;  // Tempo fixo para rolagem
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const scrollY = startPosition + (distance * (progress / duration));

        window.scrollTo(0, scrollY);

        if (progress < duration) {
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, targetPosition);  // Garante que o destino final seja alcançado
        }
    }

    window.requestAnimationFrame(step);
}

// ==========================
// 6. Ativa a Rolagem Suave ao Clicar nos Links
// ==========================
document.querySelectorAll('#menu-list li a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();  // Previne o comportamento padrão do link
        const section = document.querySelector(this.getAttribute('href'));
        const sectionPosition = section.offsetTop;
        smoothScrollFixedTime(sectionPosition);  // Inicia a rolagem suave até a seção alvo
    });
});
