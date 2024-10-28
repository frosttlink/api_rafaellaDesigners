import { inserirPservice } from "../service/protutos_service/inserirProdutosService.js";
import { removerPservice } from "../service/protutos_service/removerProdutosService.js";
import { alterarPservice } from "../service/protutos_service/alterarProdutosService.js";
import { consultarPIDservice } from "../service/protutos_service/consultarIDProdutoService.js";
import { consultarPservice } from "../service/protutos_service/consultarProdutosService.js";
import { alterarImgService } from "../service/protutos_service/alterarIMGService.js";

import multer from "multer";
import { Router } from "express";



const endpoints = Router();

endpoints.get('/produto', async (req,resp) =>{
    try {
        let registros = await consultarPservice();
        resp.send(registros);
    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})

endpoints.get('/produto/:id', async (req,resp) =>{
    try {
        let id = req.params.id;

        let registros = await consultarPIDservice(id);
        resp.send(registros);
    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})

endpoints.post('/produto', async (req,resp) =>{
    try {
        let produto = req.body;
        let id = await inserirPservice(produto);

        resp.send({
            novoID: id
        })
    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})


endpoints.put('/produto/:id', async (req,resp) =>{
    try {
        let id = req.params.id;
        let produto = req.body;

        let linhasAfetadas = await alterarPservice(produto,id);

        if(linhasAfetadas >= 1){
            resp.send('deu certo');
        }
       
    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})


endpoints.delete('/produto/:id', async (req,resp) =>{
    try {
        let id = req.params.id;

        let linhasAfetadas = await removerPservice(id);
        if(linhasAfetadas >= 1 ){
            resp.send()
        }

    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})

let uploadFoto = multer({ dest: 'storage/fotosprodutos'});

endpoints.put('/produto/:id/image',uploadFoto.single('image'), async (req,resp) =>{
    try {
        let id = req.params.id;
        let caminho = req.file.path;

        await alterarImgService(id, caminho);

        resp.status(200).send('imagem enviada');
    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})




export default endpoints