import { inserirProdutoAndEstoqueservice } from "../service/produtoAndEstoque/adicionarProdutoAndEstoque.js";
import { Router } from "express";
import { alterarProdutoAndEstoqueService } from "../service/produtoAndEstoque/alterarProdutoAndEstoque.js";
import { removerPEservice } from "../service/produtoAndEstoque/deletarProdutoAndEstoque.js";

const endpoints = Router();

endpoints.post('/produto/estoque', async (req,resp) =>{
    try {
        let produto = req.body;
        
        let id = await inserirProdutoAndEstoqueservice(produto);

        resp.send({
            novoID: id
        })
    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})


endpoints.put('/produto/estoque/:id', async (req,resp) =>{
    try {
        let id = req.params.id;
        let produto = req.body;

        let linhasAfetadas = await alterarProdutoAndEstoqueService(produto,id);

        if (linhasAfetadas.produtoAtualizado > 0 || linhasAfetadas.estoqueAtualizado > 0) {
            resp.send('Produto e/ou estoque atualizados com sucesso.');
        } else {
            resp.status(404).send('Nenhum produto ou estoque encontrado para o ID fornecido.');
        }
    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})


endpoints.delete('/estoqueProduto/:id', async (req,resp) =>{
    try {
        let id = req.params.id;

        await removerPEservice(id);
        resp.status(204).send();


    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})

export default endpoints