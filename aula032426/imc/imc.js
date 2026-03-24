//Importar métodos de imcFunc
import { imc, classificacao, validar, limparElementos, imprimirErro  } from "./imcFunc.js";

//Recuperar o botão enviar e o span de erro
const botao = document.querySelector("#btnEnviar")
const spanErro = document.querySelector("#erro")
//Registrar (addEventListener) o evento click do botão
botao.addEventListener("click", ()  => {
    limparElementos("info")

    let pessoa = {
        nome: document.querySelector("#nome").value.trim(),
        altura: Number(document.querySelector("#altura").value),
        peso: Number(document.querySelector("#peso").value)
    }

    let msg = validar(pessoa)
    if (msg) {
        imprimirErro(msg, spanErro)
        return
    }

    pessoa.imc = imc(pessoa.peso, pessoa.altura)
    pessoa.classificacao = classificacao(pessoa.imc)

    exibirDados(pessoa)
})

//Função já pronta exibirDados
function exibirDados({nome, imc, classificacao}){
    document.querySelector('#dados').textContent = "Dados do pessoa";
    document.querySelector('#pessoaNome').textContent = `Nome: ${nome}`;
    document.querySelector('#pessoaImc').textContent = `Grau: ${imc}`;
    document.querySelector('#pessoaClassificacao').textContent = `Classificação: ${classificacao}`;
}