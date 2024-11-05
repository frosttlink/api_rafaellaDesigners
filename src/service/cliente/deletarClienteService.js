import { deletarCliente } from "../../repository/clienteRepository.js";
export default async function deletarClienteService(id){
    let linhasAfetadas = await deletarCliente(id);
    if(linhasAfetadas == 0)
        throw new Error("nao deletou mano")
}