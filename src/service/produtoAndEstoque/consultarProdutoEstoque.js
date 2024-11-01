import { consultarEP } from "../../repository/produtoAndEstoquerRepository.js";

export async function consultarEPService(produto){
    let registros = await consultarEP(produto);

    return registros
}