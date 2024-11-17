import { consultarAdmSenha } from "../../repository/admRepository.js";

export default async function consultarSenhaService(){
    let registros = await consultarAdmSenha();
    
    return registros;
}