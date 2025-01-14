// Função para mostrar o menu ao rolar a página (para desktop)
window.addEventListener('scroll', function() {
    const menu = document.querySelector('.menu');

    // Verifica se a largura da janela é maior que 768px (modo desktop)
    if (window.innerWidth > 768) {
        // Adiciona a classe 'scrolled' ao rolar mais de 100px
        if (window.scrollY > 100) {
            menu.classList.add('scrolled');
        } else {
            menu.classList.remove('scrolled');
        }
    }
});

// Seleciona o ícone do hambúrguer, o menu e os itens do menu
const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu ul li a');

// Alterna a exibição do menu ao clicar no ícone
menuIcon.addEventListener('click', function() {
    menu.classList.toggle('active');  // Abre ou fecha o menu
    menuIcon.classList.toggle('open'); // Alterna entre hambúrguer e 'X'
});

// Fecha o menu ao clicar em qualquer item do menu ou no ícone de hambúrguer (quando 'X')
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        closeMenu();  // Fecha o menu
    });
});

// Função para fechar o menu
function closeMenu() {
    menu.classList.remove('active');  // Fecha o menu
    menuIcon.classList.remove('open');  // Volta ao ícone de hambúrguer
}
