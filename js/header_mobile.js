
// Altera o Menu baseado no Tamanho  Janela
document.addEventListener("DOMContentLoaded", function () {
    const larguraTela = window.innerWidth;
    const menu = document.querySelector(".header-button-group");
    const icone_drop = document.querySelector(".icone_menu"); // primeiro botão
    if(larguraTela <= 768){
        menu.style.setProperty('display', 'none', 'important');
        icone_drop.style.display = 'block';
        // console.log("internamente o valor é " + icone_drop.textContent)
    }

  
    icone_drop.addEventListener("click", function () {
        var condicao_menu = menu.style.display
        if(condicao_menu == 'flex'){
            console.log("flex");
            menu.style.setProperty('display', 'none', 'important');
        }else{
            menu.style.display = 'flex';
        }
    });
});


