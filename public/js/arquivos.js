let listCoord = [];

function lerArquivo(){
	fs.createReadStream("abc.csv")//passar o endereço do arquivo
	.on('error', () =>{})
	.pipe(csv({}))
	.on('data',(row) => listCoord.push(row))
	.on('end', () =>{
		console.log('terminou')
	});
}

//página que carrega os dados
app.get('/listCoord', (request, reponse) =>{
	lerArquivo();
	reponse.status(200).json(listCoord);
})