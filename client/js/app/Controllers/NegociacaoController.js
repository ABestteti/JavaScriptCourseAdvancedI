class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData       = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor      = $('#valor');
	}

	adiciona(pEvent) {
		pEvent.preventDefault();

		// Convert the form input data item 
		// to date object. Using spread operator "..."
		// pass to Date's constructor.
		// Using split to create an array from the string, and then
		// this array will have its elements changed by map function, which
		// encapsulates a arrow function "=>" to manipulate each element from 
		// the array. All this work has to be done to prepare the month and substract 1
		// from it. This is due to in Javascript month representation begins with 
		// 0 (January) till 11 (December).
		let data = new Date(
			...this._inputData.value
				.split('-')
				.map((item, indice) => item - (indice % 2))				
		);

		let negociacao = new Negociacao(
			data,
			this._inputQuantidade.value,
			this._inputValor.value
		);

		console.log(negociacao);
	}
}