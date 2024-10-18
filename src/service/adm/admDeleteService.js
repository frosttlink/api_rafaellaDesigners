import { deletarAdm } from "../../repository/admRepository.js";

export default async function deletarAdmService(id){
    let linhasAfetadas = await deletarAdm(id);

    if(linhasAfetadas == 0)
        throw new Error("nao deletou mano")
}