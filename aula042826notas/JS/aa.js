//Recuperar elementos do DOM (form e span de erro)
const formAluno = document.querySelector('form');
const spanErro = document.querySelector('#erro');
//Registrar evento submit do form
formAluno.addEventListener('submit', async e => {
    e.preventDefault();
    const aluno = {
        nome: document.querySelector('#nome').value.trim(),
        nota1: Number(document.querySelector('#nota1').value),
        nota2: Number(document.querySelector('#nota2').value) 
    };
    let erroValidacao = validar(aluno);
    if(erroValidacao){
        spanErro.textContent = erroValidacao;
        setTimeout(function(){spanErro.textContent="";}, 3000);
        return;
    }
    try{
        let resp = await fetch('processaAluno.php',{
            method: "POST",
            body: JSON.stringify(aluno),
            headers: { "Content-Type":"application/json;charset=UTF-8" }
        });

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
            throw new Error('Informações espradas do servidor ausentes.')
        preencherDados(dados);
    }catch(erro){
        spanErro.textContent = erro.message;
        setTimeout(()=>spanErro.textContent="", 3000)
    }
})

