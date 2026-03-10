const spanError = document.querySelector("#erro")
const formAluno = document.querySelector("#formMedia")
formAluno.addEventListener('submit', async evento => {
    evento.preventDefault();
    const aluno = {
        nome: document.querySelector("#nome").value.trim(),
        nota1: Number(document.querySelector("#nota1").value),
        nota2: Number(document.querySelector("#nota2").value)
    }
    let erroValidação = validar(aluno)
    if(erroValidação){
        spanError.textContent = erroValidação
        setTimeout(spanError.textContent="", 3000)
        return
    }
    limparSpans();
    try{
        let resposta = await fetch(
            'processaAluno.php',{
                method: "POST",
                body: JSON.stringify(aluno),
                headers: {"Content-Type":"application/json;charset=UTF-8"}
            })
        let dados = null
        try{
            dados = await resposta.json()
        }catch{
            //apenas mantem como estava, no caso null
        }

        if(!resposta.ok){ //não retornou na faixa 200
            let msg = `URL: ${resp.url} - ${resp.status} - ${resp.statusText}`
            if(dados?.erro) msg = dados.erro
            throw new Error(msg)
        }

        if(!dados)
            throw new Error("Servidor retornando informações vazias")
        preencherDados(dados)
    }catch(erro){
        spanError.textContent = erro.message //propriedade padrão message
        setTimeout(spanError.textContent="", 3000)
    }

})

//Funções

function limparSpans(){
    let displays = document.querySelectorAll(".info")
}

function preencherDados({nome, media, grau}){
    document.querySelector("#alunoNome").textContent = nome
    document.querySelector("#alunoMedia").textContent = media
    document.querySelector("#alunoGrau").textContent = grau
}

function validar ({nome, nota1, nota2}){
    if (!nome || !nota1 || !nota2) return "Preencha os campos"
    if (Number.isNaN(nota1) || Number.isNaN(nota2)) return "As notas devem possuir valores numéricos"
    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) return "As notas devem estar entre 0 e 10"
    return null
}