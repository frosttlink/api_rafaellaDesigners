import {alterarCliente} from '../../repository/clienteRepository.js';
export default async function alteraClienteService(id,cliente){
    let linhasAfetadas = await alterarCliente(id,cliente);
    if(linhasAfetadas == 0)
        throw new Error("nao alterou")
}