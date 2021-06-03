var divMapa = document.getElementById('mapa')

var zoom = 6;
var coordSP = [-23.533773, -46.625290]; //Coordenada de SP para referência
var tile = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
var copyright = 'OpenStreetMap, https://tile.openstreetmap.org';

var map = L.map('mapa').setView(coordSP, zoom);
L.tileLayer(tile, { attribution: copyright }).addTo(map);


//carregando JSON no mapa
var listaCovidURL = 'listaCovid';
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		let listaCovid = JSON.parse(this.response);
		alert(listaCovid.length);
		adicionarNoMapa(listaCovid);
	}
}

function carregarLista() {
	xhr.open('GET', listaCovidURL, true);
	xhr.send();
}

function adicionarNoMapa(listaCovid) {
	var heat = L.heatLayer(listaCovid, heatConfig).addTo(map);
	alert('Lista de coordenada carregada');
}

var heatConfig = {
	radius: 30,
	minOpacity: 0.3
}