const formAluno = document.querySelector('form')
const spanErro = document.querySelector('#erro')

//requisição

formAluno.addEventListener('submit', e => {
    e.preventDefault()
    const aluno = {
        nome: document.querySelector('#nome').value.trim(),
        nota1: Number(document.querySelector('#nota1').value),
        nota2: Number(document.querySelector('#nota2').value)
    }

    if (!aluno) imprimirErro('Informações faltando', spanErro, 3000)
    let msgErro = validar(aluno)
    if (msgErro) imprimirErro(msgErro, spanErro, 3000)


    limparSpans()
    fetch('processaAluno.php', {
        method: 'POST',
        body: JSON.stringify(aluno),
        headers: {'Content-type': 'application/json;charset:UTF-8'},
    })
    .then(async resp => {
        let dados = null
        try{
            dados = await resp.json();
        }catch{
            throw new Error("Problema de conversão com JSON")
        }
        if(!resp.ok){
            let msg = `URL: ${resp.url} - ${resp.status} - ${resp.statusText}`
            if(dados?.erro) msg = dados.erro;
            throw new Error(msg)
        }
        if(!dados) throw new Error('Informações esperadas do servidor ausente')
        return dados;
    })
    .then(aluno => preencherDados(aluno))
    .catch(erro => {
        imprimirErro(erro.message, spanErro, 3000)
    })
})

// funções

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

function imprimirErro(msg, campo, tempoExibicao){
    campo.textContent = msg
    setTimeout(() => {
        campo.textContent = ""
    }, tempoExibicao)
}