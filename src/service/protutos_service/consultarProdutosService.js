import { consultarProduto } from "../../repository/produtosRepository.js";

export async function consultarPservice(produto){
    let registros = await consultarProduto(produto);

    return registros
}