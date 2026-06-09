<?php
declare(strict_types=1);
require_once '../model/funcoes.php';
require_once '../../util/funcoes.php';
require_once '../model/funcoesBD.php';

$info = file_get_contents('php://input');
$aluno = json_decode($info, true);

$aluno['id'] = validarId($aluno['id']);
validar($aluno);

$aluno['media'] = obterMedia((float) $aluno['nota1'], (float) $aluno['nota2']);
$aluno['grau'] = obterGrau($aluno['media']);
try{
    /**@var callable $alterar */
    $alterar($aluno);
}catch(PDOException $e){
    $codErro = $e->errorInfo[1];
    if ($codErro == 1062) responderJson(['erro' => 'Erro de VIOLAÇÃO DE CHAVE ÚNICA para aluno'], 400);
    elseif ($codErro == 1625) responderJson(['erro' => 'Erro de VIOLAÇÃO DE CAMPO ENUM para aluno'], 400);
    elseif ($codErro == 3819) responderJson(['erro' => 'Erro de VIOLAÇÃO DE REGRA(S) CHECK para aluno'], 400);
    else responderJson(['erro' => "Erro ao alterar aluno {$e->getMessage()}"], 400);
}
responderJson($aluno, 200);
?>