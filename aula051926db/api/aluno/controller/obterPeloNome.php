<?php
declare(strict_types=1);
require_once "../model/funcoesBD.php";
require_once "../model/funcoes.php";
require_once "../../util/funcoes.php";

$nome = $_GET['nome'];

$alunos = [];

$pdo = getPDO();
try{
    /**@var callable $obterPeloNome */
    if( $nome === "" || $nome === null) {
        /**@var callable $listar */
        $alunos = $listar();
    }
    else $alunos = $obterPeloNome($nome);
}
catch(PDOException $e){
    responderJson(['erro' => 'Erro ao listar por nome'], 400);
}
responderJson($alunos, 200);
?>