import { Router } from "express";

import { consultarEservice } from "../service/estoque_service/consultarEstoqueService.js";
import { consultarEstoquePIDservice } from "../service/estoque_service/consultaIdEstoqueService.js";
import { inserirEservice } from "../service/estoque_service/inserireEstoqueService.js";
import { alterarEstoqueService } from "../service/estoque_service/alterarEstoqueService.js";
import { removerEservice } from "../service/estoque_service/removerEstoqueService.js";


const endpoints = Router();

endpoints.get('/estoque', async (req,resp) =>{
    try {
        let registros = await consultarEservice();
        resp.send(registros);
    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})

endpoints.get('/estoque/:id', async (req,resp) =>{
    try {
        let id = req.params.id;

        let registros = await consultarEstoquePIDservice(id);
        resp.send(registros);
    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})

endpoints.post('/estoque', async (req,resp) =>{
    try {
        let produto = req.body;
        let id = await inserirEservice(produto);

        resp.send({
            novoID: id
        })
    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})

endpoints.put('/estoque/:id', async (req,resp) =>{
    try {
        let id = req.params.id;
        let produto = req.body;

        let linhasAfetadas = await alterarEstoqueService(produto,id);

        if(linhasAfetadas >= 1){
            resp.send('deu certo');
        }
       
    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})


endpoints.delete('/estoque/:id', async (req,resp) =>{
    try {
        let id = req.params.id;

        let linhasAfetadas = await removerEservice(id);
        if(linhasAfetadas >= 1 ){
            resp.send()
        }

    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})

export default endpoints;