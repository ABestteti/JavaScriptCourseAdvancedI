class NegociacaoController {

	constructor() {

		let $ = document.querySelector.bind(document);
		this._inputData       = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor      = $('#valor');
		
		// Proxy implementation in order to update the view whenever a property is updated
		// or a function from ListaNegociacoes class is executed.
		this._negociacoesView = new Proxy(new ListaNegociacoes(), {
			get (target, prop, receiver) {
				if (['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
					return function() {
						console.log(`Interceptado $[prop].`);
						Reflect.apply(target[prop], target, arguments);
					}
				}
				return Reflect.get(target, prop, receiver);
			}
		})
		//this._listaNegociacoes = new ListaNegociacoes(this, function(pModel) {
		//	this._negociacoesView.update(pModel);
		//});
		// Implementacao com arrow function, pois o contexto de (this) eh passado
		// para a chamada da funcao update. Ou seja, o Arrow functions mantêm o
		// contexto lexo, mantendo a referencia da Classe de onde partiu a chamada para
		// a funcao.
		//this._listaNegociacoes = new ListaNegociacoes((pModel) => {
			// "this" aqui eh o contexto de NegociacaoController.
			// o escopo de this é léxico, em vez de ser dinâmico como a outra função. 
			// Isto significa que o this não mudará de acordo com o contexto. 
			// Da maneira como estruturamos o código, o this será 
			// NegociacaoController - esta condição será mantida independente do local 
			// em que chamemos a arrow function, porque ela está amarrada a um escopo imutável.
		//	this._negociacoesView.update(pModel);
		//});

		this._negociacoesView  = new NegociacoesView($('#negociacoesView'));

		// Faz a primeira renderizacao da lista, ainda que vazia.
		this._negociacoesView.update(this._listaNegociacoes);

		this._mensagem     = new Mensagem();
		this._mensagemView = new MensagemView($('#mensagemView'));
	}

	adiciona(pEvent) {

		pEvent.preventDefault();
		this._listaNegociacoes.adiciona(this._criaNegociacao());		

		// Codigo comentado em funcao da termos adicionado a funcao
		// update no contrutor da classe ListaNegiciacoes.
		//this._negociacoesView.update(this._listaNegociacoes);

		this._mensagem.setTexto('Negociacao adicionada com sucesso');
		this._mensagemView.update(this._mensagem);

		this._limpaFormulario();
	}

    apaga() {

		this._listaNegociacoes.esvazia();
		
		// Codigo comentado em funcao da termos adicionado a funcao
		// update no contrutor da classe ListaNegiciacoes.
        // this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.setTexto('Negociações apagadas com sucesso.');
        this._mensagemView.update(this._mensagem);
	}
		
	_criaNegociacao() {

		return new Negociacao(
			  DateHelper.textoParaData(this._inputData.value),
			  this._inputQuantidade.value,
			  this._inputValor.value
		  );
	}

	_limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0

        this._inputData.focus();
	}
}