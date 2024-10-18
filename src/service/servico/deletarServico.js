import { deletarServico } from "../../repository/servicosRepository.js";

export default async function deletarServicoService(id) {
  let linhasAfetadas = await deletarServico(id)

  if(linhasAfetadas == 0) throw new Error("Num foi de alteras naum")
  }