import { alterarServico } from "../../repository/servicosRepository.js";

export default async function alterarServicoService(id, servicoObj) {
  let linhasAfetadas = await alterarServico(id, servicoObj)

  if(linhasAfetadas == 0) throw new Error("Num foi de alteras naum")
}