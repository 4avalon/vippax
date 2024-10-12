// 1. Função para alternar o menu no modo mobile
function toggleMenu() {
    var menu = document.getElementById("menu-list");
    if (menu.style.display === "block") {
        menu.style.display = "none";
        console.log("Menu fechado");
    } else {
        menu.style.display = "block";
        console.log("Menu aberto");
    }
}

// 2. Função para adicionar ou remover a classe 'scrolled' ao menu ao rolar a página
window.onscroll = function() {
    var menu = document.getElementById("menu");
    if (window.innerWidth > 768) {  // Apenas aplica a classe 'scrolled' em telas maiores que 768px (desktop)
        if (window.pageYOffset > 100) {
            menu.classList.add("scrolled");
            console.log("Menu rolado - classe 'scrolled' adicionada");
        } else {
            menu.classList.remove("scrolled");
            console.log("Menu no topo - classe 'scrolled' removida");
        }
    } else { 
        // Remove a classe 'scrolled' automaticamente para telas menores que 768px (mobile)
        menu.classList.remove("scrolled");
        console.log("Mobile - classe 'scrolled' removida");
    }
};

// 3. Função para fechar o menu após clicar em um link (mobile)
document.querySelectorAll("#menu-list li a").forEach(function(link) {
    link.addEventListener("click", function() {
        var menu = document.getElementById("menu-list");
        if (window.innerWidth <= 768) {  // Fecha o menu apenas em dispositivos móveis
            menu.style.display = "none";
            console.log("Link clicado - Menu fechado no mobile");
        } else {
            console.log("Link clicado - Não foi necessário fechar o menu (desktop)");
        }
    });
});

// 4. Função para rolar suavemente até a seção ao clicar em um link
document.querySelectorAll('#menu-list li a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão
        const section = document.querySelector(this.getAttribute('href'));

// Remova o comportamento de scroll direto daqui e deixe que o smoothScroll.js cuide disso

        section.scrollIntoView({
            behavior: 'smooth'
       });


        console.log("Deslizando suavemente para a seção: " + this.getAttribute('href'));
    });
});