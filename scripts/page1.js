function addRow() {
	var valorSelecionado = document.getElementById("opcoes").value;
	var doadorValid = document.getElementById("nomed");
	var telefo = document.getElementById("telef");
	
	// Verifica se os campos obrigatórios estão preenchidos
	if (doadorValid.value === "" || telefo.value === "" || valorSelecionado === "") {
	  alert("Por favor, preencha todos os campos obrigatórios.");
	  return;
	}
	
	// Código para inserir uma nova linha na tabela
	let table = document.getElementById("myTable");
	let row = table.insertRow(-1);
	let produto = row.insertCell(0);
	let quantidade = row.insertCell(1);
	let doador = row.insertCell(2);
	if (doadorValid.value == "") {
	  doadorValid.value = "Anônimo";
	}
	doador.innerHTML = doadorValid.value;
	produto.innerHTML = valorSelecionado;
	quantidade.innerHTML = document.getElementById("campoQuant").value;
  
	// Código para armazenar os produtos no localStorage
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

/*inicio mudar cor da opcao select*/
const select = document.querySelector('#opcoes');
const select2 = document.querySelector('#localidade');
select.addEventListener('change', () => {
	if (select.value !== '') {
		select.classList.add('selecionado');
		select.classList.remove('selecionado2');
	} else {
		select.classList.add('selecionado2');
		select.classList.remove('selecionado');
	}
});

select2.addEventListener('change', () => {
	if (select2.value !== '') {
		select2.classList.add('selecionado');
		select2.classList.remove('selecionado2');
	} else {
		select2.classList.add('selecionado2');
		select2.classList.remove('selecionado');
	}
});
/*fim mudar cor da opcao select*/