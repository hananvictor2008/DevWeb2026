<?php
declare(strict_types=1);
require_once 'alunoFunc.php';
header("Content-Type:application/json;charset=UTF-8");
$info = file_get_contents('php://input');
$aluno = json_decode( $info, true);
if( !$aluno)
    responder(400, [ "erro" => "Problemas de conversão com JSON."]);

if( ! isset($aluno['nome'], $aluno['nota1'], $aluno['nota2']) )
    responder(400, [ "erro" => "Nem todos os valores vieram."]);

if( $aluno['nome'] === "")
    responder(400, [ "erro" => "O nome do aluno precisa ser preenchido."]);

if( ! ( is_numeric($aluno['nota1']) && is_numeric($aluno['nota2']) ) )
    responder(400, [ "erro" => "As notas precisam conter valores numéricos."]);

$nota1 = (float) $aluno['nota1'];
$nota2 = (float) $aluno['nota2'];

if( $nota1<0 || $nota1>10 || $nota2<0 || $nota2>10)
    responder(400, [ "erro" => "As notas precisam estar entre 0 e 10."]);

$nome = $aluno['nome'];
$grau = "";
$media = obterMedia( $nota1, $nota2 );
preencherGrau( $media, $grau );

$aluno['media'] = $media;
$aluno['grau'] = $grau;

responder( 200, $aluno);


