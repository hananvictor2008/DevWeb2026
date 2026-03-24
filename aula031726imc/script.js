const spanErro = document.querySelector('#erro')
const spanResposta = document.querySelector('#resultado')
const botao = document.querySelector('#botaoEnvia')

botao.addEventListener('click', async () => {
    const cliente = {
        nome: document.querySelector("#nome").value.trim(),
        peso: Number(document.querySelector("#peso").value),
        altura: Number(document.querySelector("#altura").value)
    }

    let erroValidação = validar(cliente)
    if(erroValidação){
        spanErro.textContent = erroValidação
        setTimeout(() => spanErro.textContent="", 3000)
        return
    }

    try{
        let resposta = await fetch('processaDados.php',{
                method: "POST",
                body: JSON.stringify(cliente),
                headers: {"Content-Type":"application/json;charset=UTF-8"}
            })
        let dados = null

        try{
            dados = await resposta.json()
            console.log(dados)

        }catch{
            //apenas mantem como estava, no caso null
        }

        if(!resposta.ok){ //não retornou na faixa 200
            let msg = `URL: ${resposta.url} - ${resposta.status} - ${resposta.statusText}`
            if(dados?.erro) msg = dados.erro
            throw new Error(msg)
        }

        if(!dados) throw new Error("Servidor retornando informações vazias")
        limparResposta()
        preencherDados(dados)

    }catch(erro){
        spanErro.textContent = erro.message //propriedade padrão message\
        setTimeout(() => spanErro.textContent="", 3000)
    }
})
    
function limparResposta(){
    spanErro.textContent = ""
    spanResposta.textContent = ""
}

function preencherDados({nome, imc, faixa}){
    const nomeR = document.createElement('p')
    const imcR = document.createElement('p')
    const faixaR = document.createElement('p')
    nomeR.textContent = `Nome: ${nome}`
    imcR.textContent = `Imc: ${imc}`
    faixaR.textContent = `Classificação: ${faixa}`
    spanResposta.append(nomeR,imcR, faixaR)
    
}

function validar({nome, peso, altura}){
    if (!nome || !peso || !altura) return "Preencha os campos"
    if (Number.isNaN(peso) || Number.isNaN(altura)) return "Peso e altura devem possuir valores numéricos"
    if (altura < 0.30 || altura > 2.5 || peso < 10 || peso > 300) return "Peso deve estar entre 10Kg e 300Kg. Altura deve estar entre 0,30m e 2,50m"
    return null
}