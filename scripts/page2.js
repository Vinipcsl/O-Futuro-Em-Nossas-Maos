
/*inicio validar campos input*/
function validarCampos() {
	const nome = document.querySelector('input[name="nome"]').value;
	const nome2 = document.querySelector('input[name="nome2"]').value;
	const cpf = document.querySelector('input[name="cpf"]').value;
	const telefone = document.querySelector('input[name="telefone"]').value;

	if (!nome || !nome2 || !cpf || !telefone) {
		alert('Por favor, preencha todos os campos!');
		return false;
	}

	return true;
}
document.querySelector('#btn-confirmar').addEventListener('click', (event) => {
	event.preventDefault();
	if (validarCampos()) {
		alert('Pedido confirmado! Aguarde contato!');
	}
});
/*fim validar campos input*/

/*inicio mudar mapa*/
const selectLocalidade = document.getElementById('localidade');
const mapa1 = document.getElementById('mapa1');
selectLocalidade.addEventListener('change', () => {
	const url = selectLocalidade.value;
	mapa1.src = url;
});
/*fim mudar mapa*/

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