
import {addAdm}from "../../../src/repository/admRepository.js";

export default async function admAddService(adm){
    
    let idGerado = await addAdm(adm);
    return idGerado;

}

