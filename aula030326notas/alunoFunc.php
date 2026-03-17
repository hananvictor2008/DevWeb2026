<?php
    function media(float $n1, float $n2):float{
        return ($n1 + $n2)/2;
    }
    function grau(float &$media, string &$grau):void{
        if($media > 8) $grau = "A";
        elseif($media >= 6) $grau = "B";
        elseif($media >= 4) $grau = "C";
        elseif($media >= 2) $grau = "D";
        else $grau = "E";
    }
    function resposta(array|null $info, int $cod):void{
        http_response_code($cod);
        die (json_encode($info));
    }
?>