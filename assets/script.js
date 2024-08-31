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
