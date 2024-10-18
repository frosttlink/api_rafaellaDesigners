import { adicionarAtendimento } from "../../repository/atendimentoRepository.js";

export default async function adicionarAtendimentoService(servicoObj) {
  let idGerado = await adicionarAtendimento(servicoObj);
  return idGerado;
}