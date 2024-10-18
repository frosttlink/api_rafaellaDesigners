import {alterarEndereco} from "../../../src/repository/enderecoRepository.js";

export default async function alteraEnderecoService(id,endereco){
    let linhasAfetadas = await alterarEndereco(id,endereco);

    if(linhasAfetadas == 0)
        throw new Error("nao alterou")
}
