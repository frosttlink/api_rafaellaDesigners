import { removerProduto } from "../../repository/produtosRepository.js";

export async function removerPservice(id){
    let linhasAfetadas = await removerProduto(id);

    return linhasAfetadas
}