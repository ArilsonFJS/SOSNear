var canvasRosca = document.getElementById('obitoLocomocao');
var acidentesURL = 'obitoLocomocao';
var lista = [];
var xhr = new XMLHttpRequest();

function carregarDados() {
	xhr.open('GET', acidentesdURL, true);
	xhr.send();
}

xhr.onreadystatechange = function () {
	if (this.status == 200 && this.readyState == 4) {
		lista = JSON.parse(this.response);
		carregarGrafico();
	}
}

function pegarMeios() {
	let sem = [];
	for (let i = 0; i < lista.length; i++) {
		sem.push(lista.sem);
	}
	return sem;
}

function pegarObitos() {
	let obitos = [];
	for (let i = 0; i < lista[i].length; i++) {
		obitos.push(lista.obitos);
	}
	return obitos;
}

function carregarGrafico() {

	canvasRosca = document.getElementById('obitoLocomocao');
	let meios = pegarMeios();
	let obitos = pegarObitos();

	var graficoRosca = new Chart(canvasRosca, {
		type: 'doughnut',
		data: {
			labels: ['Motocicleta', 'Pedestre', 'Automovel', 'Bicicleta', 'Outros + ND', 'Caminhão','Ônibus'],
			datasets: [{
				label: 'Óbitos por Veículo de Locomoção da Vítima ',
				data: [11.573, 8.716, 8.572, 2.220, 1.657, 1.132, 290],
				backgroundColor: ['blue', 'orange', 'green', 'black', 'gray', 'purple', 'pink']
			}]
		},
		options: {
			responsive: false,
			plugins: {
				title: {
					display: true,
					text: 'Meios de transporte',
					font: {
						size: 20
					}
				},
				legend: {
					labels: {
						font: {
							size: 16
						}
					}
				}
			}
		}
	});
}

var covidURL = 'dadosCovid';
var listaCovid = [];
var xhr = new XMLHttpRequest();

function carregarDadosCovid() {
	xhr.open('GET', covidURL, true);
	xhr.send();
}

xhr.onreadystatechange = function () {
	if (this.status == 200 && this.readyState == 4) {
		listaCovid = JSON.parse(this.response);
		carregarGraficoCovid();
	}
}

function pegarSemanas() {
	let sem = [];
	for (let i = 0; i < listaCovid.length; i++) {
		sem.push(listaCovid[i].semana);
	}
	return sem;
}

function pegarObitos() {
	let obitos = [];
	for (let i = 0; i < listaCovid.length; i++) {
		obitos.push(listaCovid[i].obitos);
	}
	return obitos;
}


function carregarGraficoCovid() {

	let canvasCovid = document.getElementById('covid');
	let semanas = pegarSemanas();
	let obitos = pegarObitos();

	let graficoCovid = new Chart(canvasCovid, {
		type: 'line',
		data: {
			labels: semanas,
			datasets: [{
				label: 'Óbitos',
				data: obitos,
				borderColor: 'red',
				borderWidth: 3,
				tension: 0.1
			}]
		},
		options: {
			responsive: false,
			plugins: {
				title: {
					display: true,
					text: 'Óbitos no Brasil por semana em 2021 ',
					font: {
						size: 20
					}
				},
				legend: {
					labels: {
						font: {
							size: 16
						}
					}
				}
			},
			scales: {
				y: {
					title: {
						display: true,
						text: 'Nº Óbitos',
						font: {
							size: 18
						}
					}
				},
				x: {
					title: {
						display: true,
						text: 'Semanas',
						font: {
							size: 18
						}
					}
				}
			}
		}
	});


}



