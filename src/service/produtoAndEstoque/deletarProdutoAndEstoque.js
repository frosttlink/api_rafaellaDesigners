import { removerProdutoAndEstoque } from "../../repository/produtoAndEstoquerRepository.js";

export async function deletarProdutoAndEstoqueService(id) {
    let { linhasAfetadas, linhasAfetadas2 } = await removerProdutoAndEstoque(id);

    const linhasAfetadasEstoque = linhasAfetadas;
    const linhasAfetadasProduto = linhasAfetadas2;

    return { linhasAfetadasEstoque, linhasAfetadasProduto };
}
