import { Router } from "express";
import { consultarEservice } from "../service/estoque_service/consultarEstoqueService.js";
import { consultarEstoquePIDservice } from "../service/estoque_service/consultaIdEstoqueService.js";
import { inserirEservice } from "../service/estoque_service/inserireEstoqueService.js";
import { alterarEstoqueService } from "../service/estoque_service/alterarEstoqueService.js";
import { removerEservice } from "../service/estoque_service/removerEstoqueService.js";

const endpoints = Router();

endpoints.post("/estoque", async (req, resp) => {
  try {
    let produto = req.body;
    let id = await inserirEservice(produto);

    resp.send({
      novoID: id,
    });
  } catch (err) {
    resp
      .status(400)
      .send({ message: "Erro ao cadastrar estoque", error: err.message });
  }
});

endpoints.get("/estoque", async (req, resp) => {
    try {
    let registros = await consultarEservice();
    resp.status(200).send(registros);
  } catch (err) {
    resp
      .status(400)
      .send({ message: "Erro ao consultar estoque", error: err.message });
  }
});

endpoints.get("/estoque/:id", async (req, resp) => {
  try {
    let id = req.params.id;

    let registros = await consultarEstoquePIDservice(id);
    resp.status(200).send(registros);
  } catch (err) {
    resp.status(400).send({
      message: "Erro ao consultar estoque por id",
      error: err.message,
    });
  }
});

endpoints.put("/estoque/:id", async (req, resp) => {
  try {
    let id = req.params.id;
    let produto = req.body;

    let linhasAfetadas = await alterarEstoqueService(produto, id);

    if (linhasAfetadas >= 1) {
      resp.status(200).send();
    }
  } catch (err) {
    resp
      .status(400)
      .send({ message: "Erro ao alterar estoque", error: err.message });
  }
});

endpoints.delete("/estoque/:id", async (req, resp) => {
  try {
    let id = req.params.id;

    let linhasAfetadas = await removerEservice(id);

    if (linhasAfetadas >= 1) {
      resp.status(200).send();
    }
  } catch (err) {
    resp
      .status(400)
      .send({ message: "Erro ao deletar estoque", error: err.message });
  }
});

export default endpoints;
