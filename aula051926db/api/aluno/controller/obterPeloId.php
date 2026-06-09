<?php
declare(strict_types=1);
require_once '../../util/funcoes.php';
require_once '../model/funcoes.php';
require_once '../model/funcoesBD.php';

$id = validarId($_GET['id']);

$aluno = null;
$pdo = getPDO();
try{
    /**@var callable $obterPeloId */
    $aluno = $obterPeloId($id);
}catch(PDOException $e){
    responderJson(['erro' => "Erro ao obter aluno {$e->getMessage()}"], 400);
}
responderJson($aluno, 200);
?>