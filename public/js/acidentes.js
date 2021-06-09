var divMapa = document.getElementById('mapa')

var zoom = 7;
var coordSP = [-23.533773, -46.625290]; //Coordenada de SP para referência
var tile = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
var copyright = 'OpenStreetMap, https://tile.openstreetmap.org';

var map = L.map('mapa').setView(coordSP, zoom);
L.tileLayer(tile, { attribution: copyright }).addTo(map);

//Carregar JSON no mapa
var listaAcidentesURL = 'listaAcidentes';
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		let listaAcidentes = JSON.parse(this.response);
		adicionarNoMapa(listaAcidentes);
	}
}

function carregarLista() {
	xhr.open('GET', listaAcidentesURL, true);
	xhr.send();
}

var acidente = L.icon({
	iconUrl: '../img/icone-acidentes.png',
	iconSize: [50,40],
	iconAnchor: [20,30],
	popupAnchor: [45,0]
});

function adicionarNoMapa(listaAcidentes) {
	for (let i = 0; i < listaAcidentes.length; i++) {
		L.marker([listaAcidentes[i].lat, listaAcidentes[i].lon],{icon: acidente}).addTo(map);
	}
}