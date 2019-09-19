class ListaNegociacoes {
    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    get getNegociacoes() {
        // Ao passarmos o this._negociacoes dentro do concat(), o retorno 
        // será uma nova lista, um novo array.
        // Agora se tentarmos usar o push() do NegociacaoController, só 
        // conseguiremos fazer a alteração na cópia da lista, mas não na original.
        return [].concat(this._negociacoes);
    }
}