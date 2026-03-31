//Importar métodos de notasFunc
import { obterMedia, obterGrau, validar } from "./notasFunc.js";
import { limparElementos, imprimirErro } from "../util.js";
//Recuperar o form e o span de erro
const formAluno = document.querySelector('form');
const spanErro = document.querySelector('#erro');
//registrar o evento (addEventListener) submit do form
formAluno.addEventListener('submit', e => {
    //evitar o comportamento padrão do submit
    e.preventDefault();
    //limpar os elementos de exibição 
    limparElementos('.info');
    //montar um objeto aluno a partir dos inputs
    let aluno = {
        nome: document.querySelector('#nome').value.trim(),
        nota1: Number(document.querySelector('#nota1').value),
        nota2: Number(document.querySelector('#nota2').value)
    }

    //validar aluno e exibir mensagem de erro por 3 segundos e sair se tiver erro
    let msgErro = validar(aluno);
    if(msgErro){
        imprimirErro(msgErro, spanErro, 3000)
        return;
    }

    //obter aluno.media e aluno.grau
    aluno.media = obterMedia(aluno.nota1, aluno.nota2);
    aluno.grau = obterGrau(aluno.media);
    //exibir dados do objeto aluno com o resultado
    exibirDados(aluno);
})
//Fim do addEventListener

//Função já pronta exibirDados
function exibirDados({nome, media, grau}){
    document.querySelector('#dados').textContent = "Dados do aluno";
    document.querySelector('#alunoNome').textContent = `Nome: ${nome}`;
    document.querySelector('#alunoMedia').textContent = `Média: ${media}`;
    document.querySelector('#alunoGrau').textContent = `Grau: ${grau}`;
}