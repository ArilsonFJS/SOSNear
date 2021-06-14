var divMapa = document.getElementById('mapa')

var zoom = 10;
var coordSP = [-23.533773, -46.625290]; //Coordenada de SP para referência
var tile = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
var copyright = 'OpenStreetMap, https://tile.openstreetmap.org';

var map = L.map('mapa').setView(coordSP, zoom);
L.tileLayer(tile, { attribution: copyright }).addTo(map);

//carregando JSON no mapa
var listaSusURL = 'listaSus';
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		let listaSus = JSON.parse(this.response);
		adicionarNoMapa(listaSus);
	}
}

function carregarLista() {
	xhr.open('GET', listaSusURL, true);
	xhr.send();
}


var sus = L.icon({
	iconUrl: '../img/icone-sus.png',
	iconSize: [50,50],
	iconAnchor: [20,30],
	popupAnchor: [45,0]
});

function adicionarNoMapa(listaSus) {
	for (let i = 0; i < listaSus.length; i++) {
		L.marker([listaSus[i].lat, listaSus[i].lon],{icon: sus}).addTo(map);
	}
}
