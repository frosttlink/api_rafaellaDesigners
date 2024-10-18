import { removerEstoque } from "../../repository/estoqueRepository.js";

export async function removerEservice(id){
    let linhasAfetadas = await removerEstoque(id);

    return linhasAfetadas
}