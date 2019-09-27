class Mensagem {

    constructor(pTexto = '') {

      this._texto = pTexto;
    }

    get getTexto() {

        return this._texto;

    }

    /**
     * @param {(arg0: string) => void} pTexto
     */
    setTexto(pTexto) {
        this._texto = pTexto;
    }
}