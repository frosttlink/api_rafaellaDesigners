import { consultarAgendamento } from "../../../src/repository/agendamentoRepository.js";

export default async function consultarAgendamentoService(){
    let linhasAfetadas = await consultarAgendamento()

    if(linhasAfetadas == 0) throw new Error("Num foi de alteras naum")
    return linhasAfetadas
}