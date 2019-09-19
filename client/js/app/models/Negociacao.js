class Negociacao {
    constructor(pData, pQuantidade, pValor) {
        this._data       = pData;
        this._quantidade = pQuantidade;
        this._valor      = pValor;

        Object.freeze(this);
    }

    get obtemVolume()  {
        return this._quantidade * this._valor;
    }

    get getData() {
        return new Date(this._data.getTime());
    }

    get getQuantidade() {
        return this._quantidade;
    }

    get getValor() {
        return this._valor;
    }
}