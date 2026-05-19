export function imprimirErro(msg, campo, tempoExibicao){
    campo.textContent = msg
    setTimeout(() => {
        campo.textContent = ""
    }, tempoExibicao)
}

export async function fazRequisicaoAA( url, metodo, dados=null){
    if(metodo === 'GET') return await fetch(url)
    let configs = {
        method: metodo,
        headers: { 'Content-type': 'application/json; charset=UTF-8'},
        body: (dados)?JSON.stringify(dados):null
    }
    return await fetch(url, configs)
}

export function fazRequisicao( url, metodo, dados=null){
    if(metodo === 'GET') return fetch(url)
    let configs = {
        method: metodo,
        headers: { 'Content-type': 'application/json; charset=UTF-8'},
        body: (dados)?JSON.stringify(dados):null
    }
    return fetch(url, configs)
}

export async function verificarErros(resp) {
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
        return dados
}
