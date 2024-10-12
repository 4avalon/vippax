// Função para rolar suavemente com controle de tempo fixo
function smoothScrollFixedTime(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1600;  // Tempo fixo de rolagem
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const scrollY = startPosition + (distance * (progress / duration));

        window.scrollTo(0, scrollY);

        if (progress < duration) {
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, targetPosition);
        }
    }

    window.requestAnimationFrame(step);
}

// Ativa a rolagem suave para cada link
document.querySelectorAll('#menu-list li a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        const sectionPosition = section.offsetTop;
        smoothScrollFixedTime(sectionPosition);
    });
});
