function entrar() {
    var email = input_email.value;
    var senha = input_senha.value;
    var validado = 0;
    const abrir_span = "<span style=color:red>";
    const fechar_span = "</span>";

    validarEmail();
    validarSenha();

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
            validado++;
        }
    }

    function validarSenha() {
        var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;
        if (senha.length < 8 || !regex.exec(senha)) {
            mensagem_senha.innerHTML = abrir_span + "Senha inválida" + fechar_span;
        }
        else {
            mensagem_senha.innerHTML = "";
            validado++
        }
    }

    if (validado == 2) {
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nomeUsuario;
                    sessionStorage.APELIDO_USUARIO = json.apelidoUsuario;
                    sessionStorage.ID_USUARIO = json.idUsuario;
                    sessionStorage.NOMEJOGO_USUARIO = json.nomeJogo;

                    setTimeout(function () {
                        window.location = "../dashboard/jogos.html";
                    }, 1000); // apenas para exibir o loading

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");
                alert("Falha ao tentar realizar o login! Verifique se seu e-mail e senha estão corretos.")

                resposta.text().then(texto => {
                    console.error(texto);
                    /* finalizarAguardar(texto); */
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
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