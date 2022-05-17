var email = input_email.value;
var senha = input_senha.value;

function login() {

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