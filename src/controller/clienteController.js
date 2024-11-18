import { Router} from "express";
import clienteAddService from "../service/cliente/clienteAddService.js";
import alteraClienteService from "../service/cliente/alterarClienteService.js";
import deletarClienteService from "../service/cliente/deletarClienteService.js";
import consultarClienteService from "../service/cliente/consultarClienteService.js";
import { autenticar } from "../utils/jwt.js";
const endpoint = Router();

endpoint.post("/cliente", async (req, resp) => {
    try {
        let cliente = req.body;
        let idGerado = await clienteAddService(cliente);

        resp.send({ id: idGerado });
    } catch (error) {
        console.error("Erro ao adicionar cliente:", error.message);

        if (error.message === "Cliente com o mesmo nome e telefone já existe.") {
            resp.status(400).send({ message: error.message });
        } else {
            resp.status(500).send({ message: "Erro interno ao adicionar cliente", error: error.message });
        }
    }
});



endpoint.put("/cliente/:id", async (req, resp) => {
    try {
        let cliente = req.body;
        let id = req.params.id;
        await alteraClienteService(id, cliente);
        resp.status(200).send();
    } catch (err) {
        console.error("Erro ao alterar cliente:", err.message);
        resp.status(400).send({ message: "Erro ao alterar cliente", error: err.message });
    }
});

endpoint.delete("/cliente/:id", async (req, resp) => {
    try {
        let id = req.params.id;
        await deletarClienteService(id);
        resp.status(200).send();
    } catch (err) {
        console.error("Erro ao deletar cliente:", err.message);
        resp.status(400).send({ message: "Erro ao deletar cliente", error: err.message });
    }
});

endpoint.get("/cliente", async (req, resp) => {
    try {
        let registros = await consultarClienteService();
        resp.status(200).send(registros);
    } catch (err) {
        console.error("Erro ao consultar clientes:", err.message);
        resp.status(400).send({ message: "Erro ao consultar clientes", error: err.message });
    }
});

export default endpoint;