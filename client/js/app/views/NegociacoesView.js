class NegociacoesView {

    constructor(elemento) {
        this._elemento = elemento;
    }

    _template(pModel) {

        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            <tbody>
               ${pModel.getNegociacoes.map((n) => {
            return `
        <tr>
            <td>${DateHelper.dataParaTexto(n.data)}</td>
            <td>${n.quantidade}</td>
            <td>${n.valor}</td>
            <td>${n.volume}</td>
        </tr>
      `
        })}
            </tbody>
     </table>
            `;
    }

    update(model) {

        // O innerHTML será responsável por converter as strings em 
        // elementos do DOM. Isto será inserido com filho da <div>.
        this._elemento.innerHTML = this._template(model);
    }
}