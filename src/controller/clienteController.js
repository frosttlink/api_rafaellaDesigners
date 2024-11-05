import { Router} from "express";
import clienteAddService from "../service/cliente/clienteAddService.js";
import alteraClienteService from "../service/cliente/alterarClienteService.js";
import deletarClienteService from "../service/cliente/deletarClienteService.js";
import consultarClienteService from "../service/cliente/consultarClienteService.js";
import { autenticar } from "../utils/jwt.js";
const endpoint = Router();
endpoint.post("/cliente", async (req,resp) =>{
    try {
        let cliente = req.body;
        
       let idGerado =  await clienteAddService(cliente);
       
       resp.send({
           id: idGerado
       })
    } 
    catch (err) {
        resp.status(400).send("ERRnnynO");
    }
})
endpoint.put("/cliente/:id", async (req,resp) =>{
    try {
        let cliente = req.body;
        let id = req.params.id;
        await alteraClienteService(id,cliente);
        resp.status(200).send();
    } catch (err) {
        resp.status(400).send("ERRnnynO");
    }
})
endpoint.delete("/cliente/:id", async (req,resp) =>{
    try {
        let id = req.params.id;
        await deletarClienteService(id);
        
        resp.status(200).send();
    } catch (err) {
        resp.status(400).send("ERRnnynO");
    }
})
endpoint.get("/cliente", async (req,resp) =>{
    try {
        let resgistros = await consultarClienteService();
        resp.status(200).send(resgistros);
    } catch (err) {
        resp.status(400).send("ERRnnynO");
    }
})
export default endpoint;