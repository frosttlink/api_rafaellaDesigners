import { adicionarAgendamento } from "../../../src/repository/agendamentoRepository.js";

export default async function adicionarAgendamentoService(servicoObj) {
  let idGerado = await adicionarAgendamento(servicoObj);
  return idGerado;
}