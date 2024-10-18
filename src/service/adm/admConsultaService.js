import { consultarAdm } from "../../repository/admRepository.js";

export default async function consultarAdmService(){
    let registros = await consultarAdm();
    
    return registros;
}