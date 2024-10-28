import { alterarProdutoAndEstoque } from "../../repository/produtoAndEstoquerRepository.js";

export async function alterarProdutoAndEstoqueService(produto,id){
    let linhasAfetadas = await alterarProdutoAndEstoque(produto,id);

    return linhasAfetadas
}