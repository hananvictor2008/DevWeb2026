<?php

declare(strict_types=1);
function resposta(array|null $info, int $cod):void {
    http_response_code($cod);
    die (json_encode($info));
}

function cacularTotal(float ...$n): float{
    $total = 0;
    foreach ($n as $valor) {
        $total += $valor;
    }
    return $total;
}

function validar(string $pedido):string{
    if (!$pedido) resposta(["erro" => "Problema de conversão com JSON"], 400);
    if (!isset($pedido["nome"], $pedido["nota1"], $pedido["nota2"])) resposta(["erro" => "Informações faltando"], 400);
    if ($pedido["nome"] == "") resposta(["erro" => "Nome vazio"], 400);
    if (!is_numeric($pedido["nota1"]) || !is_numeric($pedido["nota2"])) resposta(["erro" => "Notas devem ser um número"], 400);
}

?>