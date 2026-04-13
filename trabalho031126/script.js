const spanError = document.querySelector("#erro")
const formAluno = document.querySelector("#formMedia")
formAluno.addEventListener('submit', async evento => {
    evento.preventDefault();
    const pedido = {
        nome: document.querySelector("#lanches").value.trim(),
        nota1: Number(document.querySelector("#bebidas").value),
        nota2: Number(document.querySelector("#sobresas").value)
    }
    let erroValidação = validar(pedido)
    if(erroValidação){
        spanError.textContent = erroValidação
        setTimeout(() => spanError.textContent="", 3000)
        return
    }
    try{
        let resposta = await fetch('server.php',{
                method: "POST",
                body: JSON.stringify(pedido),
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
        spanError.textContent = erro.message //propriedade padrão message\
        setTimeout(() => spanError.textContent="", 3000)
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
