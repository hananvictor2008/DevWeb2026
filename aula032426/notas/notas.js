//Importar métodos de notasFunc
import { media, grau, validarAluno, limparElementos, imprimirErro } from "./notasFunc.js";
//Recuperar o form e o span de erro
const form = document.querySelector("form")
const spanErro = document.querySelector('#erro')
//registrar o evento (addEventListener) submit do form
form.addEventListener("submit", e => {
    e.preventDefault()
    limparElementos("info")
    let aluno = {
        nome: document.querySelector("#nome").value.trim(),
        nota1: Number(document.querySelector("#nota1").value),
        nota2: Number(document.querySelector("#nota2").value)
    }
    let msg = validarAluno(aluno)
    if (msg) {
        imprimirErro(msg, spanErro)
        return
    }
    aluno.media = media(aluno.nota1, aluno.nota2)
    aluno.grau = grau(aluno.media)

    exibirDados(aluno)
})
//Fim do addEventListener

//Função já pronta exibirDados
function exibirDados({nome, media, grau}){
    document.querySelector('#dados').textContent = "Dados do aluno";
    document.querySelector('#alunoNome').textContent = `Nome: ${nome}`;
    document.querySelector('#alunoMedia').textContent = `Média: ${media}`;
    document.querySelector('#alunoGrau').textContent = `Grau: ${grau}`;
}