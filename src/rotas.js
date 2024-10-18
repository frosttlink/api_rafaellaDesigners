import clienteController from './controller/clienteController.js';
import enderecoController from './controller/enderecoController.js';
import admController from './controller/admController.js';

export default function rotas (servidor){
    servidor.use(clienteController);
    servidor.use(enderecoController);
    servidor.use(admController);
}