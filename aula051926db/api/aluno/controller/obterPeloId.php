<?php
declare(strict_types=1);
require_once '../model/funcoesAluno.php';
require_once '../../util/funcoesUtil.php';

$id = (int) $_GET['id'];

$aluno = null;
$pdo = getPDO();
try{
    $sql = "SELECT id, nome, nota1, nota2, media, grau FROM aluno WHERE id = :ID";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":ID", $id, PDO::PARAM_INT);
    $stmt->execute();
    $aluno = $stmt->fetch(PDO::FETCH_ASSOC);
}catch(PDOException $e){
    responderJson(['erro' => "Erro ao obter aluno {$e->getMessage()}"], 400);
}
responderJson($aluno, 200);
?>