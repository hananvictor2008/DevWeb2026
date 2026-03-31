//Função para obter media
function obterMedia(n1, n2){
    return ((n1+n2)/2).toFixed(2);
}
//Função para obter Grau
function obterGrau(med){
    if( med> 8 )
        return "A";
    else if( med>= 6 )
        return "B";
    else if( med >= 4)
        return "C";
    else if( med > 2)
        return "D";
    else
        return "E";
}
//Função para validar um aluno
function validar({nome, nota1, nota2}){
    if(!nome) return "Preencha o nome.";
    if( Number.isNaN(nota1) || Number.isNaN(nota2) )
        return "Notas precisam conter valores numéricos";
    if( nota1<0 || nota1>10 || nota2<0 || nota2>10 )
        return "As notas devem estar entre 0 e 10.";
    return null;
}
//função (limparElementos) para limpar o textContent de elementos a partir de uma classe

//exportar as funções
export {obterMedia, obterGrau, validar}