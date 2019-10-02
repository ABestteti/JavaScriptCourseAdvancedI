class ListaNegociacoes {
    //constructor(pContexto, pArmadilha) {
    constructor(pArmadilha) {
        this._negociacoes = [];
        this._armadilha   = pArmadilha;
        //this._contexto    = pContexto;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);

        this._armadilha(this);
        // Usa reflection do JavaScript para envocar a 
        // funcao de atualizacao da view
        // Reflect.apply recebe como parametros:
        // Funcao para ser executada
        // O contexto da classe que tem uma instancia de ListaNegociacoes
        // Array contento os parametros para execucao da funcao, se a mesma
        //   tiver parametros formais.
        //Reflect.apply(this._armadilha, this._contexto, [this]);        
    }

    get getNegociacoes() {
        // Programação defensiva para evitar que this._negociacoes seja modificada
        // por outras classes.
        // Ao passarmos o this._negociacoes dentro do concat(), o retorno 
        // será uma nova lista, um novo array.
        // Agora se tentarmos usar o push() do NegociacaoController, só 
        // conseguiremos fazer a alteração na cópia da lista, mas não na original.

        // Criar um novo array "[]" e concatena o array this._negociacoes, evitando que ele seja
        // modificado em outras classes.
        return [].concat(this._negociacoes);
    }

    esvazia()   {

        this._negociacoes = [];


        this._armadilha(this);
        // Usa reflection do JavaScript para envocar a 
        // funcao de atualizacao da view
        // Reflect.apply recebe como parametros:
        // Funcao para ser executada
        // O contexto da classe que tem uma instancia de ListaNegociacoes
        // Array contento os parametros para execucao da funcao, se a mesma
        //   tiver parametros formais.
        //Reflect.apply(this._armadilha, this._contexto, [this]);
    }
}