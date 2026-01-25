AOS.init();

document.addEventListener('DOMContentLoaded', () => {
    // Função para fechar o menu
    const closeMenu = () => {
        document.getElementById('close-menu').checked = false;
    };

    // Seleciona o título e a lista de links
    const menuLogo = document.getElementById('menu-logo');
    const menuLinks = document.querySelectorAll('#menu-links a');

    // Adiciona o evento de clique para o título
    menuLogo.addEventListener('click', closeMenu);

    // Adiciona o evento de clique para cada link no menu
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});



const wrapper = document.getElementById('js-wrapper');
const pontosContainer = document.getElementById('js-pontos');
const cards = document.querySelectorAll('.everest-card');
let index = 0;

// 1. Gera as bolinhas
cards.forEach((_, i) => {
    const p = document.createElement('div');
    p.classList.add('ponto-everest');
    if(i === 0) p.classList.add('ativo');
    p.addEventListener('click', () => moverPara(i));
    pontosContainer.appendChild(p);
});

const pontos = document.querySelectorAll('.ponto-everest');

function moverPara(novoIndex) {
    index = novoIndex;

    if (window.innerWidth > 768) {
        // LÓGICA 3D PARA COMPUTADOR
        cards.forEach((card, i) => {
            card.classList.remove('central', 'esquerda', 'direita');
            
            if (i === index) {
                card.classList.add('central');
            } else if (i === (index - 1 + cards.length) % cards.length) {
                card.classList.add('esquerda');
            } else if (i === (index + 1) % cards.length) {
                card.classList.add('direita');
            }
        });
    } else {
        // LÓGICA DE SCROLL PARA MOBILE
        const largura = cards[0].offsetWidth + 20;
        wrapper.scrollTo({ left: index * largura, behavior: 'smooth' });
    }

    atualizarPontos(index);
}

function atualizarPontos(idx) {
    pontos.forEach((p, i) => p.classList.toggle('ativo', i === idx));
}

// 3. TROCA AUTOMÁTICA
function startAuto() {
    return setInterval(() => {
        index = (index + 1) % cards.length;
        moverPara(index);
    }, 3000);
}

let loop = startAuto();

// Pausa ao interagir
wrapper.addEventListener('mouseenter', () => clearInterval(loop));
wrapper.addEventListener('mouseleave', () => loop = startAuto());
wrapper.addEventListener('touchstart', () => clearInterval(loop));

// Inicializa a primeira posição no Desktop
moverPara(0);

// Sincroniza bolinhas no scroll manual do Mobile
wrapper.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
        const current = Math.round(wrapper.scrollLeft / (cards[0].offsetWidth + 20));
        atualizarPontos(current);
        index = current;
    }
});