//Recuperar elementos do DOM (form e span de erro)
const btnCalcular = document.querySelector('#btnEnviar');
const spanErro = document.querySelector('#erro');
//Registrar evento submit do form
btnCalcular.addEventListener('click', async e => {
    e.preventDefault();
    const pessoa = {};
    pessoa.nome = document.querySelector('#nome').value.trim(),
    pessoa.peso = Number(document.querySelector('#peso').value),
    pessoa.altura = Number(document.querySelector('#altura').value) 
    let erroValidacao = validar(pessoa);
    if(erroValidacao){
        spanErro.textContent = erroValidacao;
        setTimeout(function(){spanErro.textContent="";}, 3000);
        return;
    }
    try{
        let resp = await fetch('processaDados.php',{
            method: "POST",
            body: JSON.stringify(pessoa),
            headers: { "Content-Type":"application/json;charset=UTF-8" }
        });

        limparSpans();
        let dados = null;
        try{
            dados = await resp.json();
        }catch{
            //Não deu p/ transformar em JSON
        }
        if( !resp.ok ){
            let msg = `URL: ${resp.url} - ${resp.status} - ${resp.statusText}`;
            if(dados?.erro) msg = dados.erro;
            throw new Error( msg );
        }
        if(!dados)
            throw new Error('Informações esperadas do servidor ausentes.')
        preencherDados(dados);
    }catch(erro){
        spanErro.textContent = erro.message;
        setTimeout(()=>spanErro.textContent="", 3000)
    }
})

//Criar as funções validar, limparSpans, preencherDados
function limparSpans(){
    let displays = document.querySelectorAll('.info');
    displays.forEach( elemento => elemento.textContent = "");
}
function preencherDados({nome, imc, classificacao}){
    document.querySelector('#dados').textContent = "Resultado";
    document.querySelector('#pessoaNome').textContent = `Nome: ${nome}`;
    document.querySelector('#pessoaImc').textContent = `IMC: ${imc.toFixed(2)}`;
    document.querySelector('#pessoaClassificacao').textContent = `Classificação: ${classificacao}`;
}
function validar({nome, peso, altura}){
    if(!nome) return "Preencha o nome.";
    if( Number.isNaN(peso) || Number.isNaN(altura) )
        return "Peso e altura precisam conter valores numéricos";
    /*if( peso<10 || peso>300 || altura<0.30 || altura>2.50 )
        return "Peso e altura precisam conter valores dentro da normalidade.";*/
    return null;
}