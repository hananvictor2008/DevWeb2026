<?php

declare(strict_types=1);
require_once('func.php');
header("Content-type: application/json;charset=UTF-8");

$info = file_get_contents('php://input');
$pedido = json_decode($info, true);

validar($pedido);

$pedido["valorT"] = calcularTotal($pedido);
resposta($pedido, 200);
