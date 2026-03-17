<?php
declare(strict_types=1);
    function obterImc( float $peso, float $altura):float{
        return round($peso/pow($altura, 2), 2);
    }

    function obterClassificacao(float $imc):string{
        $faixa = "";
        if ($imc < 18.5) $faixa = "Abaixo do peso normal";
        elseif ($imc < 25) $faixa = "peso normal";
        elseif ($imc < 30) $faixa = "excesso de peso";
        elseif ($imc < 35) $faixa = "obesidade classe I";
        elseif ($imc < 40) $faixa = "obesidade classe II";
        else $faixa = "obesidade classe III";
        return $faixa;
    }

    function responder(int $codStatus, array|null $info){
        http_response_code($codStatus); //envia para o JS o código de erro
        die(json_encode($info)); //tranforma em JSON e retira caracteres indesejados com essas constantes
    }
?>