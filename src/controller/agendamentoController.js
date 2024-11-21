import { Router } from "express";

import adicionarAgendamentoService from "../service/agendamentos/adiconarAgendamento.js";
import alterarAgendamentoService from "../service/agendamentos/alterarAgendamento.js";
import deletarAgendamentoService from "../service/agendamentos/deletarAgendamento.js";
import consultarAgendamentoService from "../service/agendamentos/consultarAgendamento.js";

const endpoints = Router()

endpoints.get('/agendamento', async (req, resp) => {
    try{
        let registro= await consultarAgendamentoService();
        resp.send(registro);
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.post("/agendamento/", async (req, resp) => {
  try {
    let agendamento = req.body;

    let novoAgendamento = {
      data: agendamento.data,
      domicilio: agendamento.domicilio,
      servico: agendamento.servico,
      idCliente: agendamento.idCliente,
      endereco: agendamento.endereco || null,
      realizado: agendamento.realizado || false,
    };
    

    let idGerado = await adicionarAgendamentoService(novoAgendamento);

    resp.send({
      novoId: idGerado,
    });
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});


endpoints.put("/agendamento/:id", async (req, resp) => {
  try {
    let id = req.params.id;

    let agendamento = req.body;

    let agendamentoAtualizado = {
      data: agendamento.data,
      domicilio: agendamento.domicilio,
      servico: agendamento.servico,
      idCliente: agendamento.idCliente,
      endereco: agendamento.endereco, 
      realizado: agendamento.realizado || false,
    };
    await alterarAgendamentoService(id, agendamentoAtualizado);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});


endpoints.delete('/agendamento/:id', async (req, resp) => {
  try {
    let id = req.params.id

    await deletarAgendamentoService(id)

    resp.status(204).send()

  } catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

export default endpoints;