import { inserirProdutoAndEstoqueservice } from "../service/produtoAndEstoque/adicionarProdutoAndEstoque.js";
import { Router } from "express";
import { alterarProdutoAndEstoqueService } from "../service/produtoAndEstoque/alterarProdutoAndEstoque.js";
import { deletarProdutoAndEstoqueService } from "../service/produtoAndEstoque/deletarProdutoAndEstoque.js";
import { consultarEPService } from "../service/produtoAndEstoque/consultarProdutoEstoque.js";
import { autenticar } from "../utils/jwt.js";
import {  listarCategorias, removerProdutosPorCategoria } from "../repository/produtoAndEstoquerRepository.js";
import { descontarProdutosPorServico } from "../repository/agendamentoRepository.js";


const endpoints = Router();


endpoints.get('/procurar/inner/', async (req,resp) =>{
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

endpoints.get("/categoria", async (req, resp) => {
    try {
        const categorias = await listarCategorias(); 
        resp.send(categorias);
    } catch (err) {
        resp.status(400).send({ erro: err.message });
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
            resp.status(200).send('Produto e estoque deletados com sucesso.');
        } else {
            resp.status(404).send('Nenhum produto ou estoque encontrado para o ID fornecido.');
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put("/estoque/atualizar", async (req, resp) => {
    try {
      let id = req.params.id      
      let servico = req.body;
      const linhasAfetadas = await descontarProdutosPorServico(servico,id);
      resp.send(linhasAfetadas);
    } catch (err) {
      resp.status(400).send({ erro: err.message });
    }
  });

export default endpoints
  
endpoints.delete("/estoque/remover-por-categoria", async (req, resp) => {
    try {
      const { servico } = req.body; 
      const resultado = await removerProdutosPorCategoria(servico);
      resp.send(resultado);
    } catch (err) {
      resp.status(400).send({ erro: err.message });
    }
  });
  
