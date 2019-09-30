class View {

    constructor(pElemento) {

          this._elemento = pElemento;
    }

    update(pModel) {

        // O innerHTML será responsável por converter as strings em 
        // elementos do DOM. Isto será inserido com filho da <div>.
        this._elemento.innerHTML = this.template(pModel);
    }

    template() {
        throw new Error('O método template deve ser implementado');
    }
}