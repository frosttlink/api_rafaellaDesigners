import { consultarAgendamento } from "../../../src/repository/agendamentoRepository.js";

export default async function consultarAgendamentoService(){
    let registros = await consultarAgendamento()

    return registros
}