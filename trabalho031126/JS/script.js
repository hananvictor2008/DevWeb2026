const divLanches = document.querySelector("#lanches");
const divBebidas = document.querySelector("#bebidas");
const divSobremesas = document.querySelector("#sobremesas");
const spanErro = document.createElement('span');

(async () => {
    try {
        const [lanchesResp, bebidasResp, sobremesasResp] = await Promise.all([
            fetch('JSONs/lanches.json'),
            fetch('JSONs/bebidas.json'),
            fetch('JSONs/sobremesas.json')
        ]);

        if (!lanchesResp.ok) throw new Error(`Erro ao carregar lanches: ${lanchesResp.status}`);
        if (!bebidasResp.ok) throw new Error(`Erro ao carregar bebidas: ${bebidasResp.status}`);
        if (!sobremesasResp.ok) throw new Error(`Erro ao carregar sobremesas: ${sobremesasResp.status}`);

        const lanchesData = await lanchesResp.json();
        const bebidasData = await bebidasResp.json();
        const sobremesasData = await sobremesasResp.json();

        const lanches = lanchesData.lanches || lanchesData;
        const bebidas = bebidasData.bebidas || bebidasData;
        const sobremesas = sobremesasData.sobremesas || sobremesasData;

        console.log('Lanches carregados:', lanches);
        console.log('Bebidas carregadas:', bebidas);
        console.log('Sobremesas carregadas:', sobremesas);

        montarListaDePedidos(lanches, bebidas, sobremesas);

    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
        imprimirErro(erro.message, spanErro, 3000);
    }
})()

function montarListaDePedidos(lanches, bebidas, sobremesas) {
    while (divLanches.firstChild) {
        divLanches.removeChild(divLanches.firstChild);
    }
    while (divBebidas.firstChild) {
        divBebidas.removeChild(divBebidas.firstChild);
    }
    while (divSobremesas.firstChild) {
        divSobremesas.removeChild(divSobremesas.firstChild);
    }

    if (lanches && lanches.length > 0) {
        lanches.forEach(lanche => {
            const card = criarCardProduto(lanche);
            divLanches.appendChild(card);
        });
    }
    if (bebidas && bebidas.length > 0) {
        bebidas.forEach(bebida => {
            const card = criarCardProduto(bebida);
            divBebidas.appendChild(card);
        });
    }
    if (sobremesas && sobremesas.length > 0) {
        sobremesas.forEach(sobremesa => {
            const card = criarCardProduto(sobremesa);
            divSobremesas.appendChild(card);
        });
    }
}

function criarCardProduto(produto) {
    const div = document.createElement("div");
    div.className = "cardDeProduto";
    div.setAttribute('data-id', produto.id);
    div.setAttribute('data-nome', produto.nome);
    div.setAttribute('data-preco', produto.preco);
    div.innerHTML = `
        <h4>${produto.nome}</h4>
        <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
        <button class="btn-adicionar" data-id="${produto.id}">
            Adicionar ao Carrinho
        </button>
    `;
    
    return div;
}

function imprimirErro(mensagem, elemento, tempo) {
    console.error(mensagem);
    if (elemento) {
        elemento.textContent = mensagem;
        setTimeout(() => {
            elemento.textContent = '';
        }, tempo);
    }
}