import servicosController from "./controller/servicosController.js"
import agendamentoController from "./controller/agendamentoController.js"
import clienteController from './controller/clienteController.js';
import admController from './controller/admController.js';
import estoqueControler from './controller/estoqueController.js';
import produtoController from './controller/produtoController.js'
import produtoAndEstoqueController from './controller/produtoAndEstoqueController.js'


export default function rotas (servidor){
    servidor.use(clienteController);
    servidor.use(admController);
    servidor.use(servicosController);
    servidor.use(agendamentoController);
    servidor.use(estoqueControler);
    servidor.use(produtoController);
    servidor.use(produtoAndEstoqueController);
}



