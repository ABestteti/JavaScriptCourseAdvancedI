class NegociacoesView extends View {

    constructor(pElemento) {
        super(pElemento);
    }

    template(pModel) {

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
                  <!-- ${pModel.getNegociacoes.reduce((totalizador, negociacao) => totalizador + negociacao.obtemVolume, 0.0)} -->
                  ${pModel.getVolumeTotal}
               </td>
            </tfoot>
        </table>
        `;
    }
}