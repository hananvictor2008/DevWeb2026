const formAluno = document.querySelector('form');
const spanErro = document.querySelector('#erro');

//Criar as funções valida, preencheDados
function preencheDados({nome, media, grau}){
    document.querySelector('#dados').textContent = "Dados do aluno";
    document.querySelector('#alunoNome').textContent = `Nome: ${nome}`;
    document.querySelector('#alunoMedia').textContent = `Média: ${media}`;
    document.querySelector('#alunoGrau').textContent = `Grau: ${grau}`;
}
function valida({nome, nota1, nota2}){
    if(!nome) return "Preencha o nome.";
    if( Number.isNaN(nota1) || Number.isNaN(nota2) )
        return "Notas precisam conter valores numéricos";
    /*if( nota1<0 || nota1>10 || nota2<0 || nota2>10 )
        return "As notas devem estar entre 0 e 10.";*/
    return null;
}

export { valida, preencheDados, spanErro, formAluno }
