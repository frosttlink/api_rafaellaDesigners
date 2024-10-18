import { consultarIDEstoque } from "../../repository/estoqueRepository.js";


export async function consultarEstoquePIDservice(id){
    let linhasAfetadas = await consultarIDEstoque(id);

    return linhasAfetadas
}                                           