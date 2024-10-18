import { alterarEstoque } from "../../repository/estoqueRepository.js";

export async function alterarEstoqueService(estoque,id){
    let linhasAfetadas = await alterarEstoque(estoque, id);

    return linhasAfetadas
}