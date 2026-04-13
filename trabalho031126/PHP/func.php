<?php

declare(strict_types=1);
function resposta(array|null $info, int $cod):void {
    http_response_code($cod);
    die (json_encode($info));
}

function calcularTotal(array $pedido): float {
    $total = 0;
    foreach ($pedido['lanches'] as $item) {
        $total += $item['preco'] * $item['quantidade'];
    }
    foreach ($pedido['bebidas'] as $item) {
        $total += $item['preco'] * $item['quantidade'];
    }
    foreach ($pedido['sobremesas'] as $item) {
        $total += $item['preco'] * $item['quantidade'];
    }
    return $total;
}

function validar(array $pedido):void{
    if (!$pedido) resposta(["erro" => "Problema de conversão com JSON"], 400);
    if (empty($pedido['lanches']) && empty($pedido['bebidas']) && empty($pedido['sobremesas']))
        resposta(['erro' => 'Pedido totalmente vazio'], 400);
}
?>