class Negociacao {
    constructor(pData, pQuantidade, pValor) {
        this._data       = pData;
        this._quantidade = pQuantidade;
        this._valor      = pValor;

        Object.freeze(this);
    }

    obtemVolume()  {
        return this._quantidade * this._valor;
    }

    getData() {
        return this._data;
    }

    getQuantidade() {
        return this._quantidade;
    }

    getValor() {
        return this._valor;
    }
}