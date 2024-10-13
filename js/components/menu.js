// Mostrar o menu ao rolar a página
window.addEventListener('scroll', function() {
    const menu = document.querySelector('.menu');

    // Adiciona a classe 'scrolled' ao rolar mais de 100px
    if (window.scrollY > 100) {
        menu.classList.add('scrolled');
    } else {
        menu.classList.remove('scrolled');
    }
});
