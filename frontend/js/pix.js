document.addEventListener("DOMContentLoaded", function () {
    function mensagemRetorno(mensagem) {
        var notification = document.getElementById('notification');
        notification.innerText = mensagem;
        notification.style.display = 'block';
        
        setTimeout(function() {
            notification.style.display = 'none';
        }, 5000);
    };


    const btn_pix = document.querySelector(".pix-button");
    btn_pix.addEventListener('click', function(){
        let codigo_pix = "00020126430014br.gov.bcb.pix0114407724360001130203Pix5204000053039865802BR5925LAR PE GUIDO BRASIL CRIAN6007MOSSORO622905253krpgtaqOUrY9r9uCtM47E4k56304B043"
        navigator.clipboard.writeText(codigo_pix).then(() => {
            mensagemRetorno("Texto copiado com sucesso!");
        }).catch(err => {
            mensagemRetorno("Falha ao copiar o texto.");
        });
    })
})
