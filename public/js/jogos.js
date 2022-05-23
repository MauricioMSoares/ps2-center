function votarBen() {

}

function votarShrek() {

}

function votarMadagascar() {

}

function votarGow() {

}

function votarMafia() {

}

function votar() {
    fetch("/usuarios/votar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idServer: id,
            votoServer: voto
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO votar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.VOTO_USUARIO = json.voto;

                //CONFERIR
                setTimeout(function () {
                    window.location = "dashboard.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar votar!");
            alert("Falha ao tentar votar!");

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