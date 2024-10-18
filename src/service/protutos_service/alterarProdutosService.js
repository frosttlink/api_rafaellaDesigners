import { alterarProduto } from "../../repository/produtosRepository.js";

export async function alterarPservice(produto,id){
    let linhasAfetadas = await alterarProduto(produto,id);

    return linhasAfetadas
}