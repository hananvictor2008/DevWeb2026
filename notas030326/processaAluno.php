<?php
declare(strict_types=1);
require_once "alunoFunc.php";
header("Content-Type:application/json; charset=UTF-8");
$info = file_get_contents('php:://input'); //equivalente ao $_GET ou $_POST, acessa de forma genérica
$aluno = json_decode($info, true); // transforma o json em um array associativo (nome=>Hanan, nota1=>2, ...)

if (!$aluno) resposta("Problema de conversão com JSON", 400);
if (!isset($aluno["nome"], $aluno["nota1"], $aluno["nota2"])) resposta("Informações faltantes", 400);
if ($aluno["nome"] == "") resposta("Nome vazio", 400);
if (!is_numeric($aluno["nota1"]) || !is_numeric($aluno["nota2"])) resposta("Notas devem ser um número", 400);

$n1 = (float) $aluno["nota1"];
$n2 = (float) $aluno["nota2"];

if ($n1 < 0 || $n1 > 10 || $n2 < 0 || $n2 > 10) resposta("Notas devem ser no mínimo 0 e no máximo 10", 400);

$nome = $aluno["nome"];
$media = media($n1, $n2);
$grau = "";
grau($media, $grau);

$aluno["media"] = $media;
$aluno["grau"] = $grau;

resposta("", 200)
?>

<!-- 
<html>
    <body>
        <h3>Dados do Aluno:</h3><hr/>
        <?php echo "Nome: $nome" ?><br/>
        <?php echo "Média: $media" ?><br/>
        <?php echo "Grau: $grau" ?><br/>
    </body>
    </html> -->