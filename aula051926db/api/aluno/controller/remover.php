<?php
declare(strict_types=1);
require_once '../../util/funcoesUtil.php';

$id = (int) $_GET['id'];

$pdo = getPDO();

$linhasAfetadas = 0;
try{
    $sql = "DELETE FROM aluno WHERE id = :ID";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':ID', $id, PDO::PARAM_INT);
    $stmt->execute();
    $linhasAfetadas = $stmt->rowCount();
}catch(PDOException $e){
    responderJson(['erro' => "Erro ao remover aluno {$e->getMessage()}"], 400);
}
responderJson(["Linhas afetadas" => $linhasAfetadas], 204);
?>