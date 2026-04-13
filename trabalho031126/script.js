const divLanches = document.querySelector("#lanches");
const divBebidas = document.querySelector("#bebidas");
const divSobremesas = document.querySelector("#sobremesas");
(() => {
    let lanches={};
    let bebidas={};
    let sobremesas={};
    fetch('lanches.json')
        .then(resp => {
            if (!resp.ok) throw new Error(`Erro: ${resp.status} - ${resp.statusText}`)
            return resp.json()
        })
        .then(dados => {
            console.log(dados.lanches)
            lanches = dados.lanches;
        })

        .catch(erro => imprimirErro(erro.massage, spanErro, 3000))

    fetch('bebidas.json')
        .then(resp => {
            if (!resp.ok) throw new Error(`Erro: ${resp.status} - ${resp.statusText}`)
            return resp.json()
        })
        .then(dados => {
            console.log(dados.bebidas)

            bebidas = dados.bebidas;
        })
        .catch(erro => imprimirErro(erro.massage, spanErro, 3000))

    fetch('sobremesas.json')
        .then(resp => {
            if (!resp.ok) throw new Error(`Erro: ${resp.status} - ${resp.statusText}`)
            return resp.json()
        })
        .then(dados => {
            console.log(dados.sobremesas)

            sobremesas = dados.sobremesas;
        })

        .catch(erro => imprimirErro(erro.massage, spanErro, 3000))
    montarListaDePedidos(lanches, bebidas, sobremesas);

})();
function montarListaDePedidos(lanches, bebidas, sobremesas) {
    while (divLanches.firstChild) {
        divLanches.removeChild(divLanches.firstChild)
    }
    while (divBebidas.firstChild) {
        divBebidas.removeChild(divBebidas.firstChild)
    }
    while (divSobremesas.firstChild) {
        divSobremesas.removeChild(divSobremesas.firstChild)
    }


    lanches.forEach(lanche => {
        const { id, nome, preco } = lanche;
        const div = document.createElement("div");
        div.className = "cardDeProduto";
        div.setAttribute('data-id', lanche.id);
        div.setAttribute('data-nome', lanche.nome);
        div.setAttribute('data-preco', lanche.preco);
        div.innerHTML= `
        <h4>${lanche.nome}</h4>
        <p class="preco">R$ ${lanche.preco.toFixed(2)}</p>
        <button class="btn-adicionar" data-id="${lanche.id}">
            Adicionar ao Carrinho
        </button>`
    
        })
    bebidas.forEach(bebida => {
        const { id, nome, preco } = bebida;
        const div = document.createElement("div");
        div.className = "cardDeProduto";
        div.setAttribute('data-id', bebida.id);
        div.setAttribute('data-nome', bebida.nome);
        div.setAttribute('data-preco', bebida.preco);
        div.innerHTML= `
        <h4>${bebida.nome}</h4>
        <p class="preco">R$ ${bebida.preco.toFixed(2)}</p>
        <button class="btn-adicionar" data-id="${bebida.id}">
            Adicionar ao Carrinho
        </button>`
    
        })

        bebidas.forEach(bebida => {
        const { id, nome, preco } = bebida;
        const div = document.createElement("div");
        div.className = "cardDeProduto";
        div.setAttribute('data-id', bebida.id);
        div.setAttribute('data-nome', bebida.nome);
        div.setAttribute('data-preco', bebida.preco);
        div.innerHTML= `
        <h4>${bebida.nome}</h4>
        <p class="preco">R$ ${bebida.preco.toFixed(2)}</p>
        <button class="btn-adicionar" data-id="${bebida.id}">
            Adicionar ao Carrinho
        </button>`
    
        })
    }

