
import {addEndereco}from "../../../src/repository/enderecoRepository.js";

export default async function enderecoAddService(endereco){
    
    let idGerado = await addEndereco(endereco);
    return idGerado;

}

