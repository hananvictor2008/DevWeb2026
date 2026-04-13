const divLanches = document.querySelector("#lanches");
const divBebidas = document.querySelector("#bebidas");
const divSobremesas = document.querySelector("#sobremesas");
const listaCarrinho = document.querySelector("#listaCarrinho");
const divTotal = document.querySelector('#divtotal');
const spanErro = document.querySelector('#erro');

let carrinho = [];

(async () => {
    try {
        const lanchesResp = await fetch('JSONs/lanches.json')
        const bebidasResp = await fetch('JSONs/bebidas.json')
        const sobremesasResp = await fetch('JSONs/sobremesas.json')

        if (!lanchesResp.ok) throw new Error(`Erro ao carregar lanches: ${lanchesResp.status}`);
        if (!bebidasResp.ok) throw new Error(`Erro ao carregar bebidas: ${bebidasResp.status}`);
        if (!sobremesasResp.ok) throw new Error(`Erro ao carregar sobremesas: ${sobremesasResp.status}`);

        const lanchesData = await lanchesResp.json();
        const bebidasData = await bebidasResp.json();
        const sobremesasData = await sobremesasResp.json();
        
        const lanches = lanchesData.lanches || lanchesData;
        const bebidas = bebidasData.bebidas || bebidasData;
        const sobremesas = sobremesasData.sobremesas || sobremesasData;

        lanches.forEach(lanche => {
            lanche.tipo = 'lanche'
        })
        bebidas.forEach(bebida => {
            bebida.tipo = 'bebida'
        })
        sobremesas.forEach(sobremesa => {
            sobremesa.tipo = 'sobremesa'
        })

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
    div.innerHTML = `
        <h4>${produto.nome}</h4>
        <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
        <button class="btn-adicionar" data-id="${produto.id}">
            Adicionar ao Carrinho
        </button>
    `;
    div.addEventListener('click', () => {
        adicionarAoCarrinho(produto);
    });
    return div;
}

function adicionarAoCarrinho(produto) {
    const itemExistente = carrinho.find(item => item.id === produto.id);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1,
            tipo: produto.tipo
        });
    }
    
    atualizarCarrinho();
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<div class="carrinho-vazio">Carrinho vazio</div>';
        return;
    }
    listaCarrinho.innerHTML = '';
    
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item-carrinho';
        li.innerHTML = `
            <div>
                <strong>${item.nome}</strong><br>
                R$ ${item.preco.toFixed(2)} x ${item.quantidade}
            </div>
            <button class="btn-remover" data-id="${item.id}">Remover</button>
        `;
        listaCarrinho.appendChild(li);
    });
    
    document.querySelectorAll('.btn-remover').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            removerDoCarrinho(id);
        });
    });
    console.log(carrinho)
}

//==============================Requisição pro PHP ========================================================

divTotal.addEventListener('click', () => {
    enviarPedido(carrinho)
})

async function enviarPedido(carrinho) {
    if (carrinho.length === 0) {
        alert('Carrinho vazio!');
        return;
    }

    let pedido = montaPedido(carrinho)

    try {
        let resp = await fetch('PHP/server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset-UTF-8'
            },
            body: JSON.stringify(pedido)
        });
        
        let dados = null
        try{
            dados = await resp.json()
        }catch{
            //não deu p/ transformar em JSON
        }

        if(!resp.ok){
            let msg = `URL: ${resp.url} - ${resp.status} - ${resp.statusText}`
            if(dados?.erro) msg = dados.erro
            throw new Error(msg) //objeto padrão que será recebido no catch
        }
        exibirTotal(dados)
    }catch(erro){
        spanErro.textContent = erro.message
        setTimeout(()=>spanErro.textContent="", 3000)
    }
}

function montaPedido(carrinho){
    let lanches = []
    let bebidas = []
    let sobremesas = []

    carrinho.forEach(item => {
        switch (item.tipo) {
            case 'lanche':
                lanches.push(item)
                break;
            case 'bebida':
                bebidas.push(item)
                break;
            case 'sobremesa':
                sobremesas.push(item)
                break;
            default:
                break;
        }
    })

    let produtos = {
        lanches,
        bebidas,
        sobremesas
    }
    return produtos
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

function exibirTotal({valorT}){
    document.querySelector("#total").textContent = valorT.toFixed(2)
}