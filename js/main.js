//Referência: https://www.youtube.com/watch?v=zUd_lUxe2k8

var imagens = ["../imgs/banner-1.jpg", "../imgs/banner-2.jpg", 
"../imgs/banner-3.jpg", "../imgs/banner-4.jpg", "../imgs/banner-5.jpg"];
var imagemAtual = 0;
var qtd_imagens = imagens.length;

setInterval(trocar_imagem, 3000);

function trocar_imagem() {
    switch (imagemAtual) {
        default:
            caixa_banner.innerHTML = `<div id="banner" style="background-image: url('../imgs/banner-1.jpg')">`;
            break;
        case 1:
            caixa_banner.innerHTML = `<div id="banner" style="background-image: url('../imgs/banner-2.jpg')">`;
            break;
        case 2:
            caixa_banner.innerHTML = `<div id="banner" style="background-image: url('../imgs/banner-3.jpg')">`;
            break;
        case 3:
            caixa_banner.innerHTML = `<div id="banner" style="background-image: url('../imgs/banner-4.jpg')">`;
            break;
        case 4:
            caixa_banner.innerHTML = `<div id="banner" style="background-image: url('../imgs/banner-5.jpg')">`;
            break;
    }
    imagemAtual++;

    if (imagemAtual == qtd_imagens) {
        imagemAtual = 0;
    }
}