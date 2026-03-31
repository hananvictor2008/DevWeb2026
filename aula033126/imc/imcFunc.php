<?php
    function obterImc(float $peso, float $altura):float{
        //$altura = ($altura/100);
        return ($peso / ($altura * $altura));
    }

    function obterClassificacao(float $imc):string{
        if( $imc < 18.5 )
           return "Abaixo do peso normal.";
        elseif( $imc < 25 )
            return "Peso normal";
        elseif( $imc < 30)
            return "Excesso de peso";
        elseif( $imc < 35)
            return "Obesidade classe I";
        elseif( $imc < 40)
            return "Obesidade classe II";
        else
            return "Obesidade classe III";
    }

    function responder( int $codStatus, array|null $info):void{
        http_response_code( $codStatus );
        die( json_encode( $info, JSON_UNESCAPED_UNICODE, JSON_UNESCAPED_SLASHES ));
    }