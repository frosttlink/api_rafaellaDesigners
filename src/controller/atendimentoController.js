import { Router } from "express";


import adicionarAtendimentoService from "../service/atendimentos/adicionarAtendimento.js";
import alterarAtendimentoService from "../service/atendimentos/alterarAtendimento.js";
import deletarAtendimentoService from "../service/atendimentos/deletarAtendimento.js";
import consultarAtendimentoService from "../service/atendimentos/consultarAtendimento.js";

const endpoints = Router()

endpoints.get('/atendimento/consultar/', async (req, resp) => {
    try{
        let registro= await consultarAtendimentoService();
        resp.send(registro);
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.post("/atendimento/", async (req, resp) => {
  try {

    let servicoObj = req.body
    let idGerado = await adicionarAtendimentoService(servicoObj)

    resp.send({
      novoId: idGerado
    })

  } catch (err) {

    resp.status(400).send({
      erro: err.message
    })

  }
})

endpoints.put("/atendimento/:id", async (req, resp) => {
  try {
    let id = req.params.id
    let atendimento = req.body

    await alterarAtendimentoService(id, atendimento)

    resp.status(204).send()

  } catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

endpoints.delete('/atendimento/:id', async (req, resp) => {
  try {
    let id = req.params.id

    await deletarAtendimentoService(id)

    resp.status(204).send()

  } catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

export default endpoints;