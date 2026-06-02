const formAluno = document.querySelector('form');
const spanErro = document.querySelector('#erro');
const corpoTabela = document.querySelector('#tblAluno tbody');

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

function preencherTabela(alunos){
    while(corpoTabela.firstChild) 
        corpoTabela.removeChild(corpoTabela.firstChild);
    alunos.forEach(aluno => {
        const linha = document.createElement('tr');
        const {id, nome, nota1, nota2, media, grau} = aluno;
        const [tdId, tdNome, tdNota1, tdNota2, tdMedia, tdGrau, tdAcao] = ['td', 'td', 'td', 'td', 'td', 'td', 'td'].map(tagTd => document.createElement(tagTd));
        tdId.textContent = id;
        tdNome.textContent = nome;
        tdNota1.textContent = nota1;
        tdNota2.textContent = nota2;
        tdMedia.textContent = media;
        tdGrau.textContent = grau;

        const [btnExcluir, btnAlterar] = ['BUTTON', 'BUTTON'].map(tagBTN => document.createElement(tagBTN));
        tdAcao.append(btnExcluir, btnAlterar);
        btnAlterar.dataset.id = id
        btnAlterar.textContent = '[ALTERAR]';
        btnExcluir.dataset.id = id
        btnExcluir.textContent = '[EXCLUIR]';

        linha.append(tdId, tdNome, tdNota1, tdNota2, tdMedia, tdGrau, tdAcao);
        corpoTabela.append(linha);
    });
}

function preencheForm({id, nome, nota1, nota2}){
    formAluno.id.value = id;
    formAluno.nome.value = nome;
    formAluno.nota1.value = nota1;
    formAluno.nota2.value = nota2;
    formAluno.btnEnviar.value = 'Calcular e alterar';
}

export { valida, preencheDados, spanErro, formAluno, preencherTabela, preencheForm }
