var voto = 0;
function votarBen() {
    voto = 1;
    votar();
    sessionStorage.setItem("NOMEJOGO_USUARIO", "Ben 10 Protector of Earth");
}

function votarShrek() {
    voto = 2;
    votar();
    sessionStorage.setItem("NOMEJOGO_USUARIO", "Shrek Super Slam");
}

function votarMadagascar() {
    voto = 3;
    votar();
    sessionStorage.setItem("NOMEJOGO_USUARIO", "Madagascar");
}

function votarGow() {
    voto = 4;
    votar();
    sessionStorage.setItem("NOMEJOGO_USUARIO", "God of War");
}

function votarMafia() {
    voto = 5;
    votar();
    sessionStorage.setItem("NOMEJOGO_USUARIO", "Mafia");
}

function votar() {
    var id = sessionStorage.ID_USUARIO;

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

                //CONFERIR
                setTimeout(function () {
                    window.location = "dashboard.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Voto realizado com sucesso!");
            alert("Voto realizado com sucesso! Redirecionando para a tela de gráficos...");
            setTimeout(function () {
                window.location = "dashboard.html";
            }, 1000);

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}