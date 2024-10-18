import { consultarAtendiamento } from "../../repository/atendimentoRepository.js"

export default async function consultarAtendimentoService(){
    let linhasAfetadas = await consultarAtendiamento()

    if(linhasAfetadas == 0) throw new Error("Num foi de alteras naum")
    return linhasAfetadas
}