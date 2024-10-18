import servicosController from "./controller/servicosController.js"
import agendamentoController from "./controller/agendamentoController.js"
import atendimentosController from "./controller/atendimentoController.js"
import clienteController from './controller/clienteController.js';
import enderecoController from './controller/enderecoController.js';
import admController from './controller/admController.js';

export default function rotas (servidor){
    servidor.use(clienteController);
    servidor.use(enderecoController);
    servidor.use(admController);
    servidor.use(atendimentosController)
    servidor.use(servicosController)
    servidor.use(agendamentoController)
}



