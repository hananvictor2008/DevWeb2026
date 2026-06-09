<?php
function getPDO():PDO{
    $host = 'localhost';
    $db = 'basealunos';
    $user = 'root';
    $pass = 'root';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_PERSISTENT => true
    ];
    $pdo = null;
    try{
        $pdo = new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        responderJson(['erro' => "Erro ao conectar ao banco. {$e -> getMessage()}"], 400);
    }
    return $pdo;
}

function responderJson(array|null $infoDados, int $codStatus = 200):void{
    header('Content-type: application/json; charset=UTF-8');
    http_response_code($codStatus);
    die(json_encode($infoDados, JSON_UNESCAPED_UNICODE, JSON_UNESCAPED_SLASHES ));
}
?>