<?php
declare(strict_types=1);
require_once '../../util/funcoesUtil.php';
$alunos = [];

$pdo = getPDO();
try{
    $sql = 'SELECT id, nome, nota1, nota2, media, grau FROM aluno';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $aluno =  $stmt->fetchAll(PDO::FETCH_ASSOC); //retorna as linhas como matriz associativa
}catch (PDOException $e){
    responderJson(['erro'=>'Erro ao listar os alunos', 400]);
}
responderJson($alunos, 200)
?>