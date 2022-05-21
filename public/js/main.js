//Referência: https://www.youtube.com/watch?v=zUd_lUxe2k8

var imagens = ["assets/banner-1.jpg", "assets/banner-2.jpg", 
"assets/banner-3.jpg", "assets/banner-4.jpg", "assets/banner-5.jpg"];
var imagemAtual = 0;
var qtd_imagens = imagens.length;

setInterval(trocar_imagem, 3000);

function trocar_imagem() {
    switch (imagemAtual) {
        default:
            caixa_banner.innerHTML = `<div id="banner" style="background-image: url('${imagens[1]}')">`;
            break;
        case 1:
            caixa_banner.innerHTML = `<div id="banner" style="background-image: url('${imagens[2]}')">`;
            break;
        case 2:
            caixa_banner.innerHTML = `<div id="banner" style="background-image: url('${imagens[3]}')">`;
            break;
        case 3:
            caixa_banner.innerHTML = `<div id="banner" style="background-image: url('${imagens[4]}')">`;
            break;
        case 4:
            caixa_banner.innerHTML = `<div id="banner" style="background-image: url('${imagens[0]}')">`;
            break;
    }
    imagemAtual++;

    if (imagemAtual == qtd_imagens) {
        imagemAtual = 0;
    }
}