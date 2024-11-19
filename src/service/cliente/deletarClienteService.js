import { deletarCliente, deletarAgendamentosPorCliente } from "../../repository/clienteRepository.js";

export default async function deletarClienteService(id) {
    await deletarAgendamentosPorCliente(id);

    let linhasAfetadas = await deletarCliente(id);
    if (linhasAfetadas == 0)
        throw new Error("O cliente não foi deletado");
}
