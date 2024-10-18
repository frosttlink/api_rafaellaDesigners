import { Router } from "express";

import adicionarServicoService from "../service/servico/adicionarServico.js";
import alterarServicoService from "../service/servico/alterarServico.js";
import deletarServicoService from "../service/servico/deletarServico.js"
const endpoints = Router()

endpoints.post("/servico/", async (req, resp) => {
  try {

    let musicaObj = req.body
    let idGerado = await adicionarServicoService(musicaObj)

    resp.send({
      novoId: idGerado
    })

  } catch (err) {

    resp.status(400).send({
      erro: err.message
    })

  }
})

endpoints.put("/servico/:id", async (req, resp) => {
  try {
    let id = req.params.id
    let servicoObj = req.body

    await alterarServicoService(id, servicoObj)

    resp.status(204).send()

  } catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

endpoints.delete('/servico/:id', async (req, resp) => {
  try {
    let id = req.params.id

    await deletarServicoService(id)

    resp.status(204).send()

  } catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

export default endpoints;