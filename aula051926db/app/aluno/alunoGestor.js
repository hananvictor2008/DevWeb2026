import { limpaElementos, exibeErro, limpaForm } from "../js/util.js";
import { spanErro, formAluno, preencheDados, valida, preencherTabela } from "./alunoUtil.js";
import { insere, lista, remover } from "./alunoApi.js";

document.addEventListener('DOMContentLoaded', async ()=>{
//Requisição para listar
try{
        let alunos = await lista();
        preencherTabela(alunos);
     } catch (erro) {
        exibeErro(spanErro, erro.message, 3000);
    }
})

const tblAlunos = document.querySelector('#tblAluno tbody')
tblAlunos.addEventListener('click', async e => {
    const elementoDom = e.target;
    console.log(elementoDom)
    if(elementoDom.tagName === 'BUTTON'){
        const botao = elementoDom;
        console.log(botao)
        if(botao.textContent === '[EXCLUIR]'){
            try{
                await remover(botao.dataset.id);
                let alunos = await lista();
                preencherTabela(alunos);
            }catch(erro){
                exibeErro(spanErro, erro.message, 3000)
            }
        }else if(botao.textContent === '[ALTERAR]'){
            ;
        }
    }
})

formAluno.addEventListener('submit', async e => {
    e.preventDefault();
    limpaElementos('.info');
    //montar um objeto aluno a partir dos inputs
    let aluno = {
        nome: document.querySelector('#nome').value.trim(),
        nota1: Number(document.querySelector('#nota1').value),
        nota2: Number(document.querySelector('#nota2').value)
    }
    //Tratamento de erros
    let msgErro = valida( aluno );
    if(msgErro){
        exibeErro( spanErro, msgErro, 3000);
        return; //Interrompe
    }
    //Requisição para inserir
    try{
        let dados = await insere( aluno );
        preencheDados( dados );
        limpaForm(formAluno);
        setTimeout(()=>{
            limpaElementos('.info');
        }, 3000);
        let alunos = await lista();
        preencherTabela(alunos);
     } catch (erro) {
        exibeErro(spanErro, erro.message, 3000);
    }
})
//Fim do addEventListener
