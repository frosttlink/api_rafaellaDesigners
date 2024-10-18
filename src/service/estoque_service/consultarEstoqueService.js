import { consultarEstoque } from "../../repository/estoqueRepository.js";

export async function consultarEservice(produto){
    let registros = await consultarEstoque(produto);

    return registros
}