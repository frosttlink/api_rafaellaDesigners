import con from "./connection.js";

export async function adicionarProdutoAndEstoque(produto) {
    const comando = `
        insert into tb_produto(nm_produto, tp_produto, vl_produto, img_produto)
        values
        (?,?,?,?)
        ;
        `
    let resposta = await con.query(comando, [produto.nome, produto.tipo, produto.valor, produto.imagem]);

    let idProduto = resposta[0].insertId;

    const comando2 = `
       insert into tb_estoque(qtd_produto,id_produto)
    values
    (?,?)
    ;
    `

    let resposta2 = await con.query(comando2, [produto.quantidade, idProduto]);

    let idEstoque = resposta2[0].insertId;
    return idEstoque
    
}

export async function alterarProdutoAndEstoque(produto, id) {
    const comando = `
        update tb_produto
        set nm_produto       = ?,
        tp_produto       = ? ,
        vl_produto       = ?,
        img_produto      = ?
        where id_produto = ?
        `
    let resposta = await con.query(comando, [produto.nome, produto.tipo, produto.valor, produto.imagem, id]);

    let produtoAtualizado = resposta[0].affectedRows;

    const comando2 = `
       update tb_estoque
       set qtd_produto      = ?
       where id_estoque = ?
    ;
    `

    let resposta2 = await con.query(comando2, [produto.quantidade, id]);

    let estoqueAtualizado = resposta2[0].affectedRows
    return {
       estoqueAtualizado,
       produtoAtualizado 
    }
}


export async function removerProdutoAndEstoque(id){
            const comando = `
            delete from tb_estoque
            where id_estoque = ?;
            `
            const comando2 = `
            delete from tb_produto
            where id_produto = ?;
            `

            let resposta = await con.query(comando,[id]);
            let resposta2 = await con.query(comando2,[id]);


            let linhasAfetadas = resposta[0][0].affectedRows
            let linhasAfetadas2 = resposta2[0][0].affectedRows

            return {linhasAfetadas,
                    linhasAfetadas2
            }
    }   

    export async function consultarEP(){
        let comando = `
        SELECT 
            e.qtd_produto,
            p.nm_produto,
            p.tp_produto,
            p.vl_produto,
            p.img_produto
        FROM 
            tb_estoque e
        INNER JOIN 
            tb_produto p ON e.id_produto = p.id_produto;
        `
        let resposta = await con.query(comando);
        let registros = resposta[0];
    
        return registros;
    }
