import { deletarEndereco } from "../../../src/repository/enderecoRepository.js";

export default async function deletarEnderecoService(id){
    let linhasAfetadas = await deletarEndereco(id);

    if(linhasAfetadas == 0)
        throw new Error("nao deletou mano")
}