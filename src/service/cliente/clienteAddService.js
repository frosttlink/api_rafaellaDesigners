import { addCliente, verificarCliente } from "../../repository/clienteRepository.js";

export default async function clienteAddService(cliente) {
    const clienteExistente = await verificarCliente(cliente.nome, cliente.telefone);
    
    if (clienteExistente.length > 0) {
        throw new Error("Cliente com o mesmo nome e telefone já existe.");
    }

    const idGerado = await addCliente(cliente);
    return idGerado;
}
