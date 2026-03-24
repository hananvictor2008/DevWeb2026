//Função para obter media
function media(n1, n2) {
    return (n1+n2)/2
}
//Função para obter Grau
function grau(media){
    if (media > 8) return "A"
    else if (media >= 6) return "B"
    else if (media >= 4) return "C"
    else if (media > 2) return "D"
    else return "E"
}
//Função para validar um aluno
function validarAluno({nome, nota1, nota2}){
    if (!nome || !nota1 || !nota2) return "Os campos devem estar preenchidos"
    if (Number.isNaN(nota1) || Number.isNaN(nota2)) return "Notas devem possuir valores numéricos"
    if (nota1 > 10 || nota1 < 0 || nota2 > 10 || nota2 < 0) "Notas devem estar no intervalo de 0 a 10"
    return null
}
//função (limparElementos) para limpar o textContent de elementos a partir de uma classe
function limparElementos(classe){
    const elementos = document.querySelectorAll(`.${classe}`)
    if (!elementos) return 0
    elementos.forEach(elemento => {
        elemento.textContent = ""
    });
}
//função para imprimir erros
function imprimirErro(msg, campo){
    campo.textContent = msg
    setTimeout(() => {
        campo.textContent = ""
    }, 3000)
}
//exportar as funções
export {media, grau, validarAluno, limparElementos, imprimirErro}