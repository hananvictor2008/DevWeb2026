export function limparElementos(nomeDaClasse){
    let displays = document.querySelectorAll(nomeDaClasse);
    for (const elemento of displays) {
        elemento.textContent = "";
    }
}

export function imprimirErro(msg, campo, tempoExibicao){
    campo.textContent = msg
    setTimeout(() => {
        campo.textContent = ""
    }, tempoExibicao)
}