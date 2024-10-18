import { alterarImagemProduto } from "../../repository/produtosRepository.js";

export async function alterarImgService(id,caminho){
    let linhasAfetadas = await alterarImagemProduto(id,caminho);

    return linhasAfetadas
}