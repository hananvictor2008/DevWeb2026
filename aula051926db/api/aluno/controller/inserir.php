<?php
declare(strict_types=1);
require_once '../model/funcoes.php';
require_once '../../util/funcoes.php';
require_once '../model/funcoesBD.php';

$info = file_get_contents('php://input');
$aluno = json_decode($info, true);

validar($aluno);

$aluno['media'] = obterMedia((float) $aluno['nota1'], (float) $aluno['nota2']);
$aluno['grau'] = obterGrau($aluno['media']);
try{
    /**@var callable $inserir */
    $inserir($aluno);
}catch (PDOException $e){
    $codErro = $e->errorInfo[1];
    if ($codErro == 1062) responderJson(['erro'=>"Erro de VIOLAÇÃO DE CHAVE ÚNICA para aluno. {$e->getMessage()}"], 400);
    elseif ($codErro == 1265) responderJson(['erro'=>"Erro de VIOLAÇÃO DE CAMPO ENUM para aluno. {$e->getMessage()}"], 400);
    elseif ($codErro == 4025) responderJson(['erro'=>"Erro de VIOLAÇÃO DE REGRA(S) DE CHECK para aluno. {$e->getMessage()}"], 400);
    else responderJson(['erro'=>"Erro ao inserir aluno. {$e->getMessage()}'", 400]);
}
responderJson($aluno, 201);
?>