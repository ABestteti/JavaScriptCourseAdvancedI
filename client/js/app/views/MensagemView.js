class MensagemView extends View {

    constructor(pElemento) {
        super(pElemento);
    }

    _template(pModel) {
  
      return pModel.getTexto ? `<p class="alert alert-info">${pModel.getTexto}</p>` : '<p></p>';
    }
  }  