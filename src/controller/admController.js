import { Router} from "express";
import admAddService from "../service/adm/admAddService.js";
import alteraAdmService from "../service/adm/admAlterarService.js";
import deletarAdmService from "../service/adm/admDeleteService.js";
import consultarAdmService from "../service/adm/admConsultaService.js";
import validarAdmService from "../service/adm/admEntrarService.js";
import { autenticar, gerarToken } from "../utils/jwt.js";
import consultarSenhaService from "../service/adm/admSenhaService.js";
import  consultarNomeService  from "../service/adm/admServiceNome.js";


const endpoint = Router();

endpoint.post("/adm", async (req,resp) =>{
    try {

        let adm = req.body;
        
       let idGerado =  await admAddService(adm);
       
       resp.send({
           id: idGerado
       })

    } 
    catch (err) {
        resp.status(400).send({erro:err.message});
    }

})

endpoint.get("/verificarToken",autenticar, async (req,resp) =>{
    try {
        const nome = req.user.nome;
        await consultarNomeService(nome);
        resp.status(204).send()
    } catch (error) {
        resp.status(401).send({erro:err.message});
    }
})
endpoint.get("/validarToken",autenticar, async (req,resp) =>{
    try {
        let resgistros = await consultarSenhaService();
        resp.status(200).send(resgistros);
    } catch (err) {
        resp.status(400).send("erro");
    }
})
endpoint.put("/adm/:id", async (req,resp) =>{
    try {
        let adm = req.body;
        let id = req.params.id;

        await alteraAdmService(id,adm);

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send("ERRnnynO");
    }
})

endpoint.delete("/adm/:id", async (req,resp) =>{
    try {
        let id = req.params.id;

        await deletarAdmService(id);
        
        resp.status(200).send();
    } catch (err) {
        resp.status(400).send("ERRnnynO");
    }
})


endpoint.get("/adm", async (req,resp) =>{
    try {
        let resgistros = await consultarAdmService();

        resp.status(200).send(resgistros);


    } catch (err) {
        resp.status(400).send("ERRnnynO");
    }
})


endpoint.post('/entrar', async (req, resp) => {
    try {
        let adm = req.body

        let admVerificacao = await validarAdmService(adm)

        if (admVerificacao == null) {
            resp.send({ erro: "Usuário ou senha incorreto(s)" })
        } else {
            let token = gerarToken(admVerificacao);
            resp.send({
                "token": token
            })
        }
    
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default endpoint;