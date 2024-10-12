/**
 * Este script implementa a rolagem suave da página através de heros e seções, controlando a direção da rolagem
 * e adicionando uma pausa opcional entre a rolagem para um hero e a rolagem para a seção clicada.
 * 
 * ==========================
 * Para cada link no menu, é adicionada a funcionalidade de rolar suavemente até a seção desejada,
 * passando pelo hero correspondente. O comportamento é controlado pela função `scrollThroughHeroWithDirection`.
 */

// Variáveis Globais
let timeToHero = 300;  // Tempo de rolagem até o hero em milissegundos
let timeToSection = 400;  // Tempo de rolagem do hero até a seção em milissegundos
let enablePause = true;  // Controle se deve pausar entre o hero e a seção
let pauseDuration = 1500;  // Duração da pausa entre o hero e a seção em milissegundos

// 1. Função para verificar se está rolando para cima ou para baixo
function isScrollingDown(targetPosition) {
    const currentPosition = window.pageYOffset;
    return targetPosition > currentPosition;
}

// 2. Função para rolar até o hero correto baseado na direção de rolagem (descendo ou subindo)
function scrollThroughHeroWithDirection(targetPosition, clickedSection) {
    const scrollingDown = isScrollingDown(targetPosition);
    const heros = document.querySelectorAll('.hero');
    let selectedHero = null;

    // Se o destino for "home", rola diretamente até ele (sem passar por heros)
    if (clickedSection.id === 'home') {
        smoothScrollFixedTime(targetPosition, timeToSection);  // Rola diretamente até o home
        return;
    }

    // Verifica o hero correto baseado na direção
    heros.forEach(hero => {
        const heroPosition = hero.offsetTop;
        if (scrollingDown && heroPosition < targetPosition) {
            selectedHero = hero; // Seleciona o último hero antes da seção (descendo)
        } else if (!scrollingDown && heroPosition > targetPosition && !selectedHero) {
            selectedHero = hero; // Seleciona o primeiro hero depois da seção (subindo)
        }
    });

    const heroPosition = selectedHero ? selectedHero.offsetTop : targetPosition;

    // Primeira parte: rolar até o hero anterior (descendo) ou posterior (subindo) à seção
    smoothScrollFixedTime(heroPosition, timeToHero, () => {
        // Pausa opcional entre hero e seção
        if (enablePause) {
            setTimeout(() => {
                smoothScrollFixedTime(targetPosition, timeToSection);  // Segunda parte: rolar suavemente até a seção
            }, pauseDuration);
        } else {
            smoothScrollFixedTime(targetPosition, timeToSection);  // Sem pausa, rola diretamente para a seção
        }
    });
}

// 3. Função para rolar suavemente com tempo fixo e callback opcional
function smoothScrollFixedTime(targetPosition, duration, callback) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
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
            if (callback) callback();  // Executa a função callback ao final, se houver
        }
    }

    window.requestAnimationFrame(step);
}

// 4. Adiciona o comportamento de rolagem através do hero para cada link do menu
document.querySelectorAll('#menu-list li a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();  // Previne o comportamento padrão do link
        const section = document.querySelector(this.getAttribute('href'));
        const sectionPosition = section.offsetTop;
        scrollThroughHeroWithDirection(sectionPosition, section);  // Inicia a rolagem em duas etapas com direção
    });
});
