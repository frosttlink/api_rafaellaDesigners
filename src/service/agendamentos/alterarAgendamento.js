import { alterarAgendamento } from "../../../src/repository/agendamentoRepository.js";

export default async function alterarAgendamentoService(id, servicoObj) {
  let linhasAfetadas = await alterarAgendamento(id, servicoObj)

  if(linhasAfetadas == 0) throw new Error("Num foi de alteras naum")
}