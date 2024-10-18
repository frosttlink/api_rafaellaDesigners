import { Router} from "express";
import enderecoAddService from "../service/endereco/enderecoAddService.js";
import alteraEnderecoService from "../service/endereco/enderecoAlterarService.js";
import deletarEnderecoService from "../service/endereco/enderecoDeleteService.js";


const endpoint = Router();

endpoint.post("/endereco", async (req,resp) =>{
    try {

        let endereco = req.body;
        
       let idGerado =  await enderecoAddService(endereco);
       
       resp.send({
           id: idGerado
       })

    } 
    catch (err) {
        resp.status(400).send({erro:err.message});
    }

})

endpoint.put("/endereco/:id", async (req,resp) =>{
    try {
        let endereco = req.body;
        let id = req.params.id;

        await alteraEnderecoService(id,endereco);

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send("ERRnnynO");
    }
})

endpoint.delete("/endereco/:id", async (req,resp) =>{
    try {
        let id = req.params.id;

        await deletarEnderecoService(id);
        
        resp.status(200).send();
    } catch (err) {
        resp.status(400).send("ERRnnynO");
    }
})


export default endpoint;