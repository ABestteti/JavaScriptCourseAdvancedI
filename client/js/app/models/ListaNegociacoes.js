class ListaNegociacoes {
    //constructor(pContexto, pArmadilha) {
    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
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
    }

    // novo método
    get getVolumeTotal() {
        return this._negociacoes.reduce((totalizador, negociacao) => totalizador + negociacao.obtemVolume, 0.0);
     }
}