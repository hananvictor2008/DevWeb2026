<?php
function obterMedia(float $n1, float $n2):float{
    return (($n1+$n2)/2);
}

function obterGrau(float $med):string{
    if( $med> 8 )
        return "A";
    elseif( $med>= 6 )
        return "B";
    elseif( $med >= 4)
        return "C";
    elseif( $med > 2)
        return "D";
    else
        return "E";
}

function validar (array $aluno): void{
    if(!$aluno) responderJson(['erro' => "Problema de conversão com JSON"], 400);
    if(!isset($aluno['nome'], $aluno['nota1'], $aluno['nota2'])) responderJson(['erro' => 'Nem todos os valores vieram', 400]);
    if($aluno['nome'] === "") responderJson(['erro' => 'O nome precisa estar preenchido'], 400);
    if(!(is_numeric($aluno['nota1']) && is_numeric($aluno['nota2']))) responderJson(['erro' => 'As notas precisam conter valores numéricos'], 400);
    $nota1 = (float) $aluno['nota1'];
    $nota2 = (float) $aluno['nota2'];
    if ($nota1 < 0 || $nota1 > 10 || $nota2 < 0 || $nota2 > 10) responderJson(['erro' => 'As notas precisam estar entre 0 e 10'], 400);
}

function validarId(string $id): int{
    if(!isset($id) || !(is_numeric($id) || ((int) $id) > 0) ) responderJson(['erro' => "Precisa haver um ID maior que 0: {$id}"]);
    return (int) $id;
}