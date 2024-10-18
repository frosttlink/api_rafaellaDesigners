import { consultarIDProduto } from "../../repository/produtosRepository.js";

export async function consultarPIDservice(id){
    let linhasAfetadas = await consultarIDProduto(id);

    return linhasAfetadas
}                                           