import { adcionarEstoque } from "../../repository/estoqueRepository.js";

export async function inserirEservice(produto){
    let id = await adcionarEstoque(produto);

    return id
}