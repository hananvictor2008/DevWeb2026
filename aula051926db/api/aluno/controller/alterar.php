<?php
declare(strict_types=1);
require_once '../model/funcoesAluno.php';
require_once '../../util/funcoesUtil.php';

$info = file_get_contents('php://input');
$aluno = json_decode($info, true);

$nota1 = (float) $aluno['nota1'];
$nota2 = (float) $aluno['nota2'];
$media = obterMedia($nota1, $nota2);
$grau = obterGrau($media);
$aluno['media'] = $media;
$aluno['grau'] = $grau;
$aluno['id'] = (int) $aluno['id'];
$pdo = getPDO();
try{
    $sql = "UPDATE aluno SET nome = :NOME, nota1 = :NOTA1, nota2 = :NOTA2, media = :MEDIA, grau = :GRAU WHERE id = :ID";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':NOME', $aluno['nome'], PDO::PARAM_STR);
    $stmt->bindParam(':NOTA1', $aluno['nota1'], PDO::PARAM_INT);
    $stmt->bindParam(':NOTA2', $aluno['nota2'], PDO::PARAM_INT);
    $stmt->bindParam(':MEDIA', $aluno['media'], PDO::PARAM_INT);
    $stmt->bindParam(':GRAU', $aluno['grau'], PDO::PARAM_STR);
    $stmt->bindParam(':ID', $aluno['id'], PDO::PARAM_INT);
    $stmt->execute();
}catch(PDOException $e){
    $codErro = $e->errorInfo[1];
    if ($codErro == 1062) responderJson(['erro' => 'Erro de VIOLAÇÃO DE CHAVE ÚNICA para aluno'], 400);
    elseif ($codErro == 1625) responderJson(['erro' => 'Erro de VIOLAÇÃO DE CAMPO ENUM para aluno'], 400);
    elseif ($codErro == 3819) responderJson(['erro' => 'Erro de VIOLAÇÃO DE REGRA(S) CHECK para aluno'], 400);
    else responderJson(['erro' => "Erro ao alterar aluno {$e->getMessage()}"], 400);
}
responderJson($aluno, 200);
?>