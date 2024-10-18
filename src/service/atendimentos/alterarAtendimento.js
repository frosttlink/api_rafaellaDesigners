import { alterarAtendimento } from "../../../src/repository/atendimentoRepository.js";

export default async function alterarAtendimentoService(id, servicoObj) {
  let linhasAfetadas = await alterarAtendimento(id, servicoObj)

  if(linhasAfetadas == 0) throw new Error("Num foi de alteras naum")

  return linhasAfetadas
}