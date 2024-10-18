import { consultarCliente } from "../../repository/clienteRepository.js";

export default async function consultarClienteService(){
    let registros = await consultarCliente();
    
    return registros;
}