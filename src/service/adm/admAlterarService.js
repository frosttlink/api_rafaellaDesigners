import {alterarAdm} from '../../repository/admRepository.js';

export default async function alteraAdmService(id,adm){
    let linhasAfetadas = await alterarAdm(id,adm);

    if(linhasAfetadas == 0)
        throw new Error("nao alterou")
}
