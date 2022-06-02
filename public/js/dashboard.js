let proximaAtualizacao;

window.onload = obterDadosGrafico();

if (sessionStorage.APELIDO_USUARIO == "null") {
    b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
}
else {
    b_usuario.innerHTML = sessionStorage.APELIDO_USUARIO;
}

var vetor_jogos = [];
var vetor_votos = [];
var vetor_porcentagem_votos = [];

/* verificar_autenticacao(); */

/* function alterarTitulo(idAquario) {
    var tituloAquario = document.getElementById("tituloAquario")
    tituloAquario.innerHTML = "Últimas medidas de Temperatura e Umidade do <span style='color: #e6005a'>Aquário " + idAquario + "</span>"
} */

// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function obterDadosGrafico() {
    /* alterarTitulo(idAquario) */

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/usuarios/contar_votos`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                /* resposta.reverse(); */
                console.log(resposta);

                function atualizar_vetores() {
                    for (var contador = 0; contador < resposta.length; contador++) {
                        vetor_jogos.push(resposta[contador].nomeJogo);
                        vetor_votos.push(resposta[contador].votosPorJogo);
                    }
                }

                function calcular_porcentagem_votos() {
                    var totalVotos = vetor_votos[0] + vetor_votos[1] + vetor_votos[2] + vetor_votos[3] + vetor_votos[4];
                    var calculoPorcentagemVotosBen = (vetor_votos[0] * 100) / totalVotos;
                    var calculoPorcentagemVotosShrek = (vetor_votos[1] * 100) / totalVotos;
                    var calculoPorcentagemVotosMadagascar = (vetor_votos[2] * 100) / totalVotos;
                    var calculoPorcentagemVotosGow = (vetor_votos[3] * 100) / totalVotos;
                    var calculoPorcentagemVotosMafia = (vetor_votos[4] * 100) / totalVotos;
                    var porcentagemVotosBen = calculoPorcentagemVotosBen.toFixed(1);
                    var porcentagemVotosShrek = calculoPorcentagemVotosShrek.toFixed(1);
                    var porcentagemVotosMadagascar = calculoPorcentagemVotosMadagascar.toFixed(1);
                    var porcentagemVotosGow = calculoPorcentagemVotosGow.toFixed(1);
                    var porcentagemVotosMafia = calculoPorcentagemVotosMafia.toFixed(1);
                    vetor_porcentagem_votos.push(porcentagemVotosBen, porcentagemVotosShrek, porcentagemVotosMadagascar, porcentagemVotosGow, porcentagemVotosMafia);
                }

                atualizar_vetores();
                calcular_porcentagem_votos();
                plotarGrafico(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta) {
    console.log('iniciando plotagem do gráfico...');

    var data = {
        labels: [
            'Ben 10 Protector of Earth',
            'Shrek Super Slam',
            'Madagascar',
            'God of War',
            'Mafia'
        ],
        datasets: [{
            label: 'Porcentagem de votos',
            data: [vetor_porcentagem_votos[0], vetor_porcentagem_votos[1], vetor_porcentagem_votos[2], vetor_porcentagem_votos[3], vetor_porcentagem_votos[4]],
            backgroundColor: [
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 99, 132, 0.8)'
            ],
            hoverOffset: 4
        }]
    };

    var data2 = {
        labels: [
            'Ben 10 PoE',
            'Shrek SS',
            'Madagascar',
            'God of War',
            'Mafia'
        ],
        datasets: [{
            label: 'Quantidade de votos',
            data: [vetor_votos[0], vetor_votos[1], vetor_votos[2], vetor_votos[3], vetor_votos[4]],
            backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 99, 132, 0.5)'
            ],
            borderColor: [
                'rgb(75, 192, 192)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'pie',
        data: data,
        options: {}
    };

    const config2 = {
        type: 'bar',
        data: data2,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    const myChart2 = new Chart(
        document.getElementById('myChart2'),
        config2
    );

    /* for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.fkJogo);
        dados.datasets[1].data.push(registro.temperatura);
    } */

    atualizar_vetores();
    console.log(JSON.stringify(dados));

/*     var config = myChart.getContext('2d');
    window.grafico_linha = Chart.Pie(config, {
        type: 'pie',
        data: dados,
        options: {}
    }); */

    /* setTimeout(() => atualizarGrafico(dados), 2000); */
}