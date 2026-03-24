//Declare as funções com o prefixo export
export { imc, classificacao, validar, limparElementos, imprimirErro }
//Função para obter o imc ( peso / altura²)
function imc(peso, altura){
    return (peso/Math.pow(altura,2)).toFixed(2)
}
//Função para obter a classificação a partir do IMC
function classificacao(imc){
    if (imc < 18.5) return "Abaixo do peso"
    else if (imc < 25) return "Peso ideal"
    else if (imc < 30) return "Excesso de peso"
    else if (imc < 35) return "Obesidade I"
    else if (imc < 40) return "Obesidade II"
    else return "Obesidade III"
}
//Função para validar uma pessoa
function validar({nome, peso, altura}){
    if (!nome) return "Preencha nome"
    if (Number.isNaN(peso) || Number.isNaN(altura)) return "Altura e peso devem possuir valores numéricos"
    if (altura <  0.2 || altura > 3 || peso < 1 || peso > 300) return "Valores para peso e altura fora dos intervalos aceitos"
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

function imprimirErro(msg, campo){
    campo.textContent = msg
    setTimeout(() => {
        campo.textContent = ""
    }, 3000)
}