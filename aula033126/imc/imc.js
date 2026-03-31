//Importar métodos de imcFunc
import { obterImc, obterClassificacao, validar} from "./imcFunc.js";
import { limparElementos, imprimirErro } from "../util.js";
//Recuperar o botão enviar e o span de erro
const btnEnviar = document.querySelector('#btnEnviar');
const spanErro = document.querySelector('#erro');
//Registrar (addEventListener) o evento click do botão 
btnEnviar.addEventListener('click', function() {
    //Limpar os elementos de exibição
    limparElementos('.info');
    //Montar um objeto pessoa a partir dos inputs
    let pessoa = {};
    pessoa.nome = document.querySelector('#nome').value.trim(),
    pessoa.peso = Number(document.querySelector('#peso').value),
    pessoa.altura = Number(document.querySelector('#altura').value)

    //validar pessoa e exibir mensagem de erro por 3 segundos e sair se tiver erro
    let msgErro = validar(pessoa);
    if(msgErro){
        imprimirErro(msgErro, spanErro, 3000)
        return;
    }
    //obter pessoa.imc e pessoa.classificacao
    pessoa.imc = obterImc(pessoa.peso, pessoa.altura);
    pessoa.classificacao = obterClassificacao(pessoa.imc);
    //exibir dados da pessoa com o resultado
    exibirDados(pessoa);
})
//Fim do addEventListener

//Função já pronta exibirDados
function exibirDados({nome, imc, classificacao}){
    document.querySelector('#dados').textContent = "Dados do pessoa";
    document.querySelector('#pessoaNome').textContent = `Nome: ${nome}`;
    document.querySelector('#pessoaImc').textContent = `Grau: ${imc}`;
    document.querySelector('#pessoaClassificacao').textContent = `Classificação: ${classificacao}`;
}