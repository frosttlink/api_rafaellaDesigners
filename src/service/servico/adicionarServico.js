import { adicionarServico } from "../../repository/servicosRepository.js";

export default async function adicionarServicoService(servicoObj) {
  let idGerado = await adicionarServico(servicoObj);
  return idGerado;
}
