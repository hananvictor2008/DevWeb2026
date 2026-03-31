//Declare as funções com o prefixo export
//Função para obter o imc ( peso / altura²)
export function obterImc(peso, altura){
    return (peso / (altura * altura)).toFixed(2);
}
//Função para obter a classificação a partir do IMC
export function obterClassificacao(imc){
    if( imc < 18.5 )
        return "Abaixo do peso normal.";
    else if( imc < 25 )
        return "Peso normal";
    else if( imc < 30)
        return "Excesso de peso";
    else if( imc < 35)
        return "Obesidade classe I";
    else if( imc < 40)
        return "Obesidade classe II";
    else
        return "Obesidade classe III";
}

//Função para validar uma pessoa
export function validar({nome, peso, altura}){
    if(!nome) return "Preencha o nome.";
    if( Number.isNaN(peso) || Number.isNaN(altura) )
        return "Peso e altura precisam conter valores numéricos";
    if( peso<10 || peso>300 || altura<0.3 || altura>2.50 )
        return "Peso e altura precisam estar entre os padrões.";
    return null;
}

//função (limparElementos) para limpar o textContent de elementos a partir de uma classe