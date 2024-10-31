import {removerProdutoAndEstoque } from "../../repository/produtoAndEstoquerRepository";

export async function deletarProdutoAndEstoqueService(id){
    let linhasAfetadasDeletar = await removerProdutoAndEstoque (id);

    return linhasAfetadasDeletar
}