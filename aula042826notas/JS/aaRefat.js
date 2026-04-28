import { imprimirErro, fazRequisicaoAA, verificarErros } from "./util.js";

const formAluno = document.querySelector('#formMedia')
const spanErro = document.querySelector('#erro')

formAluno.addEventListener('submit', async e => {
    e.preventDefault()
    let aluno = {
        nome: document.querySelector('#nome').value.trim(),
        nota1: Number(document.querySelector('#nota1').value),
        nota2: Number(document.querySelector('#nota2').value)
    }

    let msgErro = validar(aluno)
    if (msgErro) {
        imprimirErro(msgErro, spanErro, 3000)
        return
    }

    limparSpans()
    try{
        let resposta = await fazRequisicaoAA('processaAluno.php', 'POST', aluno)
        aluno = await verificarErros(resposta)
        preencherDados(aluno)
    }catch(erro){
        imprimirErro(erro.message, spanErro, 3000)
    }
})

function validar({nome, nota1, nota2}){
    if(!nome) return "Preencha o nome.";
    if( Number.isNaN(nota1) || Number.isNaN(nota2) )
        return "Notas precisam conter valores numéricos"
    if( nota1<0 || nota1>10 || nota2<0 || nota2>10 )
        return "As notas devem estar entre 0 e 10.";
    return null;
}

function limparSpans(){
    let displays = document.querySelectorAll('.info');
    displays.forEach( elemento => elemento.textContent = "");
}

function preencherDados({nome, media, grau}){
    document.querySelector('#dados').textContent = "Dados do aluno";
    document.querySelector('#alunoNome').textContent = `Nome: ${nome}`;
    document.querySelector('#alunoMedia').textContent = `Média: ${media}`;
    document.querySelector('#alunoGrau').textContent = `Grau: ${grau}`;
}