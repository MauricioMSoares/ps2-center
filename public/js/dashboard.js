let proximaAtualizacao;

window.onload = obterDadosGrafico();

b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

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
                resposta.reverse();

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

    var dados = {
        labels: [
            'Ben 10 Protector of Earth',
            'Shrek Super Slam',
            'Madagascar',
            'God of War',
            'Mafia'
        ],
        datasets: [{
            label: 'Porcentagem de votos',
            data: [],
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

    var dados2 = {
        labels: [
            'Ben 10 PoE',
            'Shrek SS',
            'Madagascar',
            'God of War',
            'Mafia'
        ],
        datasets: [{
            label: 'Quantidade de votos',
            data: [],
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

    const config2 = {
        type: 'bar',
        data: dados2,
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

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.umidade);
        dados.datasets[1].data.push(registro.temperatura);
    }

    console.log(JSON.stringify(dados));

    var config = canvas_grafico.getContext('2d');
    window.grafico_linha = Chart.Pie(config, {
        type: 'pie',
        data: dados,
        options: {}
    });

    setTimeout(() => atualizarGrafico(dados), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(dados) {

    fetch(`/medidas/tempo-real`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico: ${dados}`);

                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                window.grafico_linha.update();

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(dados), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(dados), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}