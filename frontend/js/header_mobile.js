// Função para atualizar o menu baseado no tamanho da janela
function atualizarMenu() {
    const larguraTela = window.innerWidth;
    const menu = document.querySelector(".header-button-group");
    const icone_drop = document.querySelector(".icone_menu"); // primeiro botão
    
    if (larguraTela <= 768) {
        menu.style.setProperty('display', 'none', 'important');
        icone_drop.style.display = 'block';
    } else {
        menu.style.display = 'flex';
        icone_drop.style.display = 'none';
    }
}

// Altera o Menu baseado no Tamanho da Janela
document.addEventListener("DOMContentLoaded", function () {
    // Atualiza o menu quando a página carrega
    atualizarMenu();
    
    // Adiciona o listener para o evento de redimensionamento
    window.addEventListener("resize", atualizarMenu);
  
    // Adiciona o listener para o clique no ícone do menu
    const icone_drop = document.querySelector(".icone_menu");
    const menu = document.querySelector(".header-button-group");
    
    icone_drop.addEventListener("click", function () {
        var condicao_menu = menu.style.display;
        if (condicao_menu == 'flex') {
            console.log("flex");
            menu.style.setProperty('display', 'none', 'important');
        } else {
            menu.style.display = 'flex';
        }
    });
});