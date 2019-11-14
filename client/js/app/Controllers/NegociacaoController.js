class NegociacaoController {

	constructor() {

		let $ = document.querySelector.bind(document);
		this._inputData       = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor      = $('#valor');
				
		this._listaNegociacoes = ProxyFactory.create	(
			new ListaNegociacoes(), 
			['adiciona', 'esvazia'],
			(model) => {
				this._negociacoesView.update(model);
			});
			
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

		this._mensagem = ProxyFactory.create(
			new Mensagem(),
			['texto'],
			(model) => {
				this._mensagemView.update(model)
			});

		this._mensagemView = new MensagemView($('#mensagemView'));
		this._mensagemView.update(this._mensagem);
	}

	adiciona(pEvent) {

		pEvent.preventDefault();
		this._listaNegociacoes.adiciona(this._criaNegociacao());		

		// Codigo comentado em funcao da termos adicionado a funcao
		// update no contrutor da classe ListaNegiciacoes.
		//this._negociacoesView.update(this._listaNegociacoes);

		this._mensagem.setTexto('Negociacao adicionada com sucesso');

		this._limpaFormulario();
	}

	importaNegociacoes() {

        let service = new NegociacaoService();
        service
        .obterNegociacoes()
        .then(negociacoes => {
          negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
          this._mensagem.texto = 'Negociações do período importadas com sucesso';
        })
        .catch(error => this._mensagem.texto = error); 

		/*
		service.obterNegociacoesDaSemana((erro, negociacoes) => {
	
			if(erro) {
				this._mensagem.setTexto(erro);
				return;
			}
			negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
	
			service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
	
				if(erro) {
					this._mensagem.setTexto(erro);
					return;
				}
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
	
				service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
	
					if(erro) {
						this._mensagem.setTexto(erro);
						return;
					}
					negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
					this._mensagem.setTexto('Negociações importadas com sucesso');
				});
			});
		});
		*/
	}

    apaga() {

		this._listaNegociacoes.esvazia();
		
		// Codigo comentado em funcao da termos adicionado a funcao
		// update no contrutor da classe ListaNegiciacoes.
        // this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.setTexto('Negociações apagadas com sucesso.');

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