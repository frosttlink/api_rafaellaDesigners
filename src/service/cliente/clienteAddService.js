import { addCliente } from "../../repository/clienteRepository.js";

export default async function clienteAddService(cliente) {
    let idGerado = await addCliente(cliente);
    return idGerado;
}
