class NegociacaoService {

    obterNegociacoesDaSemana(callBack) {
        
        let xhr = new XMLHttpRequest();
        
        // Configurando a conexao
        xhr.open('GET', 'negociacoes/semana');
        
        xhr.onreadystatechange = () => {
            //0: requisição ainda não iniciada
            //1: conexão com o servidor estabelecida
            //2: requisição recebida
            //3: processando requisição
            //4: requisição está concluída e a resposta está pronta
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log('Obtendo as negociações do servidor.');
                    callBack(null, JSON.parse(xhr.responseText)
                      .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                } else {
                    console.log(xhr.responseText);
                    callback('Não foi possível obter a lista de negociações.', null);
                }
            }
        };
        
        // Executa
        xhr.send();
    } 
    
    obterNegociacoesDaSemanaAnterior(callBack) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/anterior');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
  
                    callBack(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
  
                } else {
                    console.log(xhr.responseText);
                    callBack('Não foi possível obter as negociações da semana', null);
                }  
            }
        }
  
        xhr.send();
    }
  
    obterNegociacoesDaSemanaRetrasada(callBack) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/retrasada');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
  
                    callBack(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
  
                } else {
                    console.log(xhr.responseText);
                    callBack('Não foi possível obter as negociações da semana', null);
                }  
            }
        }
  
        xhr.send();
    }
}
