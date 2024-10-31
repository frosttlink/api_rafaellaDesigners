import { deletarProdutoEstoque } from "../../repository/produtoAndEstoquerRepository.js";


export async function removerPEservice(id){
    let linhasAfetadas = await deletarProdutoEstoque(id);

    return linhasAfetadas
}