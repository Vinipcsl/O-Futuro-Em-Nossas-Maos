function addRow() {
	var valorSelecionado = document.getElementById("opcoes").value;
	var doadorValid = document.getElementById("nomed");
	let table = document.getElementById("myTable");
	let row = table.insertRow(-1);
	let produto = row.insertCell(0);
	let quantidade = row.insertCell(1);
	let doador = row.insertCell(2);
	if (doadorValid.value == "") {
		doadorValid.value = "Anônimo";
	}
	doador.innerHTML = doadorValid;
	produto.innerHTML = valorSelecionado;
	doador.innerHTML = document.getElementById("nomed").value;
	quantidade.innerHTML = document.getElementById("campoQuant").value;

	var produtos = [];
	for (var i = 1; i < table.rows.length; i++) {
		produto = {
			nome: table.rows[i].cells[0].innerHTML,
			quantidade: table.rows[i].cells[1].innerHTML,
			doador: table.rows[i].cells[2].innerHTML,
		};
		produtos.push(produto);
	}
	localStorage.setItem("produtos", JSON.stringify(produtos));
}
window.onload = function () {
	var produtos = localStorage.getItem("produtos");
	if (produtos) {
		produtos = JSON.parse(produtos);
		let table = document.getElementById("myTable");
		for (var i = 0; i < produtos.length; i++) {
			let row = table.insertRow(-1);
			let produto = row.insertCell(0);
			let quantidade = row.insertCell(1);
			let doador = row.insertCell(2);
			produto.innerHTML = produtos[i].nome;
			quantidade.innerHTML = produtos[i].quantidade;
			doador.innerHTML = produtos[i].doador;
		}
	}
}