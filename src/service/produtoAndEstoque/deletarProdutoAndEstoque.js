
import { removerProdutoAndEstoque } from "../../repository/produtoAndEstoquerRepository.js";

export async function deletarProdutoAndEstoqueService(id){
    let linhasAfetadasDeletar = await removerProdutoAndEstoque(id);
}
