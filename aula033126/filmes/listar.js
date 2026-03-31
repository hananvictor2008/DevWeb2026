'use strict';
import { imprimirErro } from "../util.js"
const divFilmes = document.querySelector("#divFilmes")
const spanErro = document.querySelector('#erro'); //precisa de ; antes da IIEF
//IIFE (funções auto invocáveis) + defer
(() => {
    fetch('filmes.json')
    .then(resp => {
        if(!resp.ok) throw new Error(`Erro: ${resp.status} - ${resp.statusText}`)
        return resp.json() //converte para json que será usado no próximo then
    })
    .then(dados => {
        console.log(dados.filmes)
        montarListaDeFilmes(dados.filmes)
    })
    .catch( erro => imprimirErro(erro.massage, spanErro, 3000))
})(); //invocação

function montarListaDeFilmes(filmes){
    while(divFilmes.firstChild){
        divFilmes.removeChild(divFilmes.firstChild)
    }
    filmes.forEach(filme => {
        const {id, titulo, resumo, generos, elenco, lancamento} = filme;

        const [liId, liTitulo, liResumo, liGeneros, liElenco, liLancamento] = ['li', 'li', 'li', 'li', 'li', 'li'].map(li => document.createElement(li))
        // const ulFilme = document.createElement('ul')
        // const liId = document.createElement('li')
        // const liTitulo = document.createElement('li')
        // const liResumo = document.createElement('li')
        // const liLancamento = document.createElement('li')
        // const liGeneros = document.createElement('li')
        // const liElenco = document.createElement('li')
        // const linha = document.createElement('hr')

        const ulGeneros = document.createElement('ul')
        liGeneros.appendChild(ulGeneros)
        generos.forEach(genero => {
            const liGenero = document.createElement('li')
            liGenero.textContent = genero
            ulGeneros.appendChild(liGenero)
        });

        const ulElenco = document.createElement('ul')
        liElenco.appendChild(ulElenco)
        elenco.forEach(pessoa => {
            const {ator} = pessoa
            const liAtor = document.createElement('li')
            liAtor.textContent = ator
            ulElenco.appendChild(liAtor)
        });

        liId.innerHTML = `<strong>Id: ${id}</strong>`
        liTitulo.innerHTML = `<strong>Título:</strong> ${titulo}`
        liResumo.innerHTML = `<strong>Resumo: </strong>${resumo}`
        liLancamento.innerHTML = `<strong>Lançamento: </strong>${lancamento.dia} (${lancamento.pais})`
        liGeneros.innerHTML = `<strong>Generos:</strong>`
        liElenco.innerHTML = `<strong>Elenco:</strong>`

        
        ulFilme.append(liId, liTitulo, liResumo, liLancamento, liGeneros, liElenco, linha)
        divFilmes.appendChild(ulFilme)
    });
}