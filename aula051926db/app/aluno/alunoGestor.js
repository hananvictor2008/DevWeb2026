import { limpaElementos, exibeErro, limpaForm } from "../js/util.js";
import { spanErro, formAluno, preencheDados, valida } from "./alunoUtil.js";
import { insere, lista } from "./alunoApi.js";

document.addEventListener('DOMContentLoaded', async ()=>{
//Requisição para listar
try{
        let dados = await lista();
        console.log(dados)
     } catch (erro) {
        exibeErro(spanErro, erro.message, 3000);
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
        await lista();
     } catch (erro) {
        exibeErro(spanErro, erro.message, 3000);
    } 
})
//Fim do addEventListener
