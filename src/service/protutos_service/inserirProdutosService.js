import { adicionarProduto } from "../../repository/produtosRepository.js";

export async function inserirPservice(produto){
    let id = await adicionarProduto(produto);

    return id
}