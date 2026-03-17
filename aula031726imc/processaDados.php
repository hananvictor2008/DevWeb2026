<?php
    declare(strict_types=1);
    require_once('funcoes.php');
    header('Content-Type:application/json;charset=UTF=8');
    $info = file_get_contents('php://input');
    $cliente = json_decode($info, true);

    if (!$cliente)  responder(400, ['erro' => 'problemas com JSON']);
    if (!isset($cliente['peso'], $cliente['nome'], $cliente['altura'])) responder(400, ['erro' => 'nem todos os valores vieram']);
    if( $cliente['nome'] === "") responder(400, [ "erro" => "O nome do cliente precisa ser preenchido."]);
    if( ! ( is_numeric($cliente['peso']) && is_numeric($cliente['altura']) ) ) responder(400, [ "erro" => "Peso e altura precisam conter valores numéricos."]);

    $peso = (float) $cliente['peso'];
    $altura = (float) $cliente['altura'];

    if ($peso < 10 || $peso > 300 || $altura < 0.30 || $altura > 2.50) responder(400, ['erro' => 'valores fora da faixa aceita']);

    $nome = $cliente['nome'];
    $imc = obterImc($peso, $altura);
    $faixa = obterClassificacao($imc);

    $cliente['imc'] = $imc;
    $cliente['faixa'] = $faixa;

    //var_dump($cliente);
    responder(200, $cliente);
