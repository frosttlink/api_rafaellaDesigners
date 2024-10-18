import { deletarAgendamento } from "../../repository/agendamentoRepository.js";

export default async function deletarAgendamentoService(id) {
  let linhasAfetadas = await deletarAgendamento(id)

  if(linhasAfetadas == 0) throw new Error("Num foi de alteras naum")
  }