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
                        <td>${DateHelper.dataParaTexto(n.getData)}</td>
                        <td>${n.getQuantidade}</td>
                        <td>${n.getValor}</td>
                        <td>${n.obtemVolume}</td>
                    </tr>
                `
                }).join('')}
            </tbody>
            <tfoot>
               <td colspan="3"></td>
               <td>
                  ${pModel.getNegociacoes.reduce((totalizador, negociacao) => totalizador + negociacao.obtemVolume, 0.0)}
               </td>
            </tfoot>
     </table>
            `;
    }

    update(pModel) {

        // O innerHTML será responsável por converter as strings em 
        // elementos do DOM. Isto será inserido com filho da <div>.
        this._elemento.innerHTML = this._template(pModel);
    }
}