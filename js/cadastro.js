function cadastrar() {
    var nome = input_nome.value.trim();
    var apelido = input_apelido.value.trim();
    var email = input_email.value.trim();
    var senha = input_senha.value;
    var confirmarSenha = input_confirmar_senha.value;

    validarNomeApelido();
    validarEmail();
    validarSenha();

    function validarNomeApelido() {
        if (nome.length < 2 && apelido.length != 0 && apelido.length < 2) {
            mensagem_nome.innerHTML = "Digite um nome e um apelido com mais de 3 caracteres";
        }
        else if (nome.length < 2) {
            mensagem_nome.innerHTML = "Digite um nome com mais de 3 caracteres";
        }
        else if (apelido.length != 0 && apelido.length < 2) {
            mensagem_nome.innerHTML = "Digite um apelido com mais de 3 caracteres";
        }
        else {
            mensagem_nome.innerHTML = "";
        }
    }

    function validarEmail() {
        if (email.indexOf('@') == -1 && email.endsWith('.com') == false) {
            mensagem_email.innerHTML = "Adicione um @ e termine seu e-mail com .com";
        }
        else if (email.indexOf('@') == -1) {
            mensagem_email.innerHTML = "Adicione um @ em seu e-mail";
        }
        else if (email.endsWith('.com') == false) {
            mensagem_email.innerHTML = "Seu e-mail deve terminar em .com";
        }
        else {
            mensagem_email.innerHTML = "";
        }
    }

    function validarSenha() {
        var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;
        if (senha.length < 8 && !regex.exec(senha)) {
            mensagem_senha.innerHTML = "Sua senha deve ter no mínimo 8 caracteres, uma letra maiúscula, minúscula, número e caractere especial";
        }
        else if (senha.length < 8) {
            mensagem_senha.innerHTML = "Sua senha deve ter no mínimo 8 caracteres";
        }
        else if (!regex.exec(senha)) {
            mensagem_senha.innerHTML = "Sua senha deve ter uma letra maiúscula, uma minúscula, um número e um caractere especial";
        }
        else if (confirmarSenha.length == 0) {
            mensagem_senha.innerHTML = "Confirme sua senha";
        }
        else if (confirmarSenha != senha) {
            mensagem_senha.innerHTML = "As senhas estão diferentes";
        }
        else {
            mensagem_senha.innerHTML = "";
        }
    }
}