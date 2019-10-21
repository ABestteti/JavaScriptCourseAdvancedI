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
				this._mensagemView.update(mode)
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
		let xhr = new XMLHttpRequest();

		// Configurando a conexao
		xhr.open('GET', 'negociacoes/semana');
		
		xhr.onreadystatechange = () => {
			//0: requisição ainda não iniciada
			//1: conexão com o servidor estabelecida
			//2: requisição recebida
			//3: processando requisição
			//4: requisição está concluída e a resposta está pronta
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					console.log('Obtendo as negociações do servidor.');
					JSON.parse(xhr.responseText)
					  .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
					  .forEach(element => this._listaNegociacoes.adiciona(element));
					  this._mensagem.setTexto('Negociações importadas com suceso.');
				} else {
					console.log(xhr.responseText);
					this._mensagem.setTexto('Não foi possível obter as informações da semana.');
				}
			}
		};

		// Executa
		xhr.send();
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