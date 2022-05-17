function cadastrar() {
    var nome = input_nome.value.trim();
    var apelido = input_apelido.value.trim();
    var email = input_email.value.trim();
    var senha = input_senha.value;
    var confirmarSenha = input_confirmar_senha.value;
    const abrir_span = "<span style=color:red>";
    const fechar_span = "</span>";

    validarNomeApelido();
    validarEmail();
    validarSenha();

    function validarNomeApelido() {
        if (nome.length < 2 && apelido.length != 0 && apelido.length < 2) {
            mensagem_nome.innerHTML = abrir_span + "Digite um nome e um apelido com mais de 3 caracteres" + fechar_span;
        }
        else if (nome.length < 2) {
            mensagem_nome.innerHTML = abrir_span + "Digite um nome com mais de 3 caracteres" + fechar_span;
        }
        else if (apelido.length != 0 && apelido.length < 2) {
            mensagem_nome.innerHTML = abrir_span + "Digite um apelido com mais de 3 caracteres" + fechar_span;
        }
        else {
            mensagem_nome.innerHTML = "";
        }
    }

    function validarEmail() {
        if (email.indexOf('@') == -1 && email.endsWith('.com') == false) {
            mensagem_email.innerHTML = abrir_span + "Adicione um @ e termine seu e-mail com .com" + fechar_span;
        }
        else if (email.indexOf('@') == -1) {
            mensagem_email.innerHTML = abrir_span + "Adicione um @ em seu e-mail" + fechar_span;
        }
        else if (email.endsWith('.com') == false) {
            mensagem_email.innerHTML = abrir_span + "Seu e-mail deve terminar em .com" + fechar_span;
        }
        else {
            mensagem_email.innerHTML = "";
        }
    }

    function validarSenha() {
        var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;
        if (senha.length < 8 && !regex.exec(senha)) {
            mensagem_senha.innerHTML = abrir_span + "Sua senha deve ter no mínimo 8 caracteres, uma letra maiúscula, minúscula, número e caractere especial" + fechar_span;
        }
        else if (senha.length < 8) {
            mensagem_senha.innerHTML = abrir_span + "Sua senha deve ter no mínimo 8 caracteres" + fechar_span;
        }
        else if (!regex.exec(senha)) {
            mensagem_senha.innerHTML = abrir_span + "Sua senha deve ter uma letra maiúscula, uma minúscula, um número e um caractere especial" + fechar_span;
        }
        else if (confirmarSenha.length == 0) {
            mensagem_senha.innerHTML = abrir_span + "Confirme sua senha" + fechar_span;
        }
        else if (confirmarSenha != senha) {
            mensagem_senha.innerHTML = abrir_span + "As senhas estão diferentes" + fechar_span;
        }
        else {
            mensagem_senha.innerHTML = "";
        }
    }
}

function exibir_senha() {
    if (document.getElementById('input_exibir_senha').checked) {
        document.getElementById('input_senha').type = 'text';
        document.getElementById('input_confirmar_senha').type = 'text';
    }
    else {
        document.getElementById('input_senha').type = 'password';
        document.getElementById('input_confirmar_senha').type = 'password';
    }
}