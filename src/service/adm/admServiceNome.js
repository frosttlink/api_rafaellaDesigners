import { consultarAdmNome } from "../../repository/admRepository.js";

export default async function consultarNomeService(nome){
    let registros = await consultarAdmNome(nome);
    if(!registros){
        throw new Error("token bosta")
    }
    return registros;
}