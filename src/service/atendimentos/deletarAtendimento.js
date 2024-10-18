import { deletarAtendimento } from "../../repository/atendimentoRepository.js";

export default async function deletarAgendamentoService(id) {
  let linhasAfetadas = await deletarAtendimento(id)

  if(linhasAfetadas == 0) throw new Error("Num foi de alteras naum")
  return linhasAfetadas
  }