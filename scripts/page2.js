
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
	if (selectLocalidade && selectLocalidade.value === '') {
		const url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.780254412028!2d-49.23792758513392!3d-16.63779413853193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef250d5f74183%3A0x78e6118444fcfc2e!2sFaculdade%20Senac%20Goi%C3%A1s%20-%20Sede!5e0!3m2!1spt-BR!2sbr!4v1681847056726!5m2!1spt-BR!2sbr';
		mapa1.src = url;
	} else{
		const url = selectLocalidade.value;
		mapa1.src = url;
	}
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