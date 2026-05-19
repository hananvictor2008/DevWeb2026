import { fazRequisicaoAA, verificaErros } from "../js/util.js";
const url = '../../api/aluno/controller/';
export async function insere( aluno ) {
        let resposta =  await fazRequisicaoAA( url+'inserir.php' , 'POST', aluno ); 
        let dados = await verificaErros( resposta );
        if( ! dados )
            throw new Error(' Dados esperados ausentes.  ');
        return dados;
}

export async function lista( ) {
        let resposta =  await fazRequisicaoAA( url+'listar.php' ); 
        let dados = await verificaErros( resposta );
        if( ! dados )
            throw new Error(' Dados esperados ausentes.  ');
        return dados;
}

