import { adicionarProdutoAndEstoque } from "../../repository/produtoAndEstoquerRepository.js";

export async function inserirProdutoAndEstoqueservice(produto){
    let id = await adicionarProdutoAndEstoque(produto);

    return id
}