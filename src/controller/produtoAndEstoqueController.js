import { inserirProdutoAndEstoqueservice } from "../service/produtoAndEstoque/adicionarProdutoAndEstoque.js";
import { Router } from "express";
import { alterarProdutoAndEstoqueService } from "../service/produtoAndEstoque/alterarProdutoAndEstoque.js";
import { deletarProdutoAndEstoqueService } from "../service/produtoAndEstoque/deletarProdutoAndEstoque.js";
import { consultarEPService } from "../service/produtoAndEstoque/consultarProdutoEstoque.js";
import { autenticar } from "../utils/jwt.js";


const endpoints = Router();

endpoints.get('/procurar/inner/',autenticar, async (req,resp) =>{
    try {
        let registros = await consultarEPService();
        
        resp.send(registros);
        //resp.send(registros.map(item => { return {...item, imagem: item.img_produto.toString()}}));
    } catch (err) {
        resp.status(400).send({
            err : err.message
        })
    }
})

endpoints.post('/adicionar/pee', async (req,resp) =>{
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


endpoints.put('/alterar/pee/:id', async (req,resp) =>{
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



endpoints.delete('/deletar/pee/:id', async (req, resp) => {
    try {
        let id = req.params.id;

        const { linhasAfetadasEstoque, linhasAfetadasProduto } = await deletarProdutoAndEstoqueService(id);

        if (linhasAfetadasEstoque > 0 || linhasAfetadasProduto > 0) {
            resp.send('Produto e estoque deletados com sucesso.');
        } else {
            resp.status(404).send('Nenhum produto ou estoque encontrado para o ID fornecido.');
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});




export default endpoints
  

