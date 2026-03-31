<?php
declare(strict_types=1);
require_once 'imcFunc.php';
header("Content-Type:application/json;charset=UTF-8");
$info = file_get_contents('php://input');
$pessoa = json_decode( $info, true);
if( !$pessoa)
    responder(400, [ "erro" => "Problemas de conversão com JSON."]);

if( ! isset($pessoa['nome'], $pessoa['peso'], $pessoa['altura']) )
    responder(400, [ "erro" => "Nem todos os valores vieram."]);

if( $pessoa['nome'] === "")
    responder(400, [ "erro" => "O nome do pessoa precisa ser preenchido."]);

if( ! ( is_numeric($pessoa['peso']) && is_numeric($pessoa['altura']) ) )
    responder(400, [ "erro" => "Peso e altura precisam conter valores numéricos."]);

$peso = (float) $pessoa['peso'];
$altura = (float) $pessoa['altura'];

if( $peso<10 || $peso>300 || $altura<0.30 || $altura>2.50)
    responder(400, [ "erro" => "Peso e altura precisam estar dentro dos padrões."]);

$nome = $pessoa['nome'];
$imc = obterImc( $peso, $altura );
$classificacao = obterClassificacao( $imc );

$pessoa['imc'] = $imc;
$pessoa['classificacao'] = $classificacao;

responder( 200, $pessoa);


