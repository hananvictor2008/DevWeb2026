<?php
declare(strict_types=1);
require_once '../../util/funcoes.php';
require_once '../model/funcoesBD.php';

$alunos = [];

try{
    /**@var callable $listar */
    $alunos = $listar();
}catch(PDOException $e) {
    responderJson(['erro' => "Erro ao listar: {$e->getMessage()}"], 400);
}
responderJson($alunos, 200);
?>