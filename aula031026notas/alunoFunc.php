<?php
    function obterMedia(float $n1, float $n2):float{
        return (($n1+$n2)/2);
    }

    function preencherGrau(float $med, string &$grau):void{
        if( $med> 8 )
            $grau = "A";
        elseif( $med>= 6 )
            $grau = "B";
        elseif( $med >= 4)
            $grau = "C";
        elseif( $med > 2)
            $grau = "D";
        else
            $grau = "E";
    }

    function responder( int $codStatus, array|null $info):void{
        http_response_code( $codStatus );
        die( json_encode( $info, JSON_UNESCAPED_UNICODE, JSON_UNESCAPED_SLASHES ));
    }