import con from "./connection.js";

export async function adicionarProdutoAndEstoque(produto) {
  const comando = `
        insert into tb_produto(nm_produto, tp_produto, vl_produto, img_produto)
        values
        (?,?,?,?)
        ;
        `;
  let resposta = await con.query(comando, [
    produto.nome,
    produto.tipo,
    produto.valor,
    produto.imagem,
  ]);

  let idProduto = resposta[0].insertId;

  const comando2 = `
       insert into tb_estoque(qtd_produto,id_produto)
    values
    (?,?)
    ;
    `;

  let resposta2 = await con.query(comando2, [produto.quantidade, idProduto]);

  let idEstoque = resposta2[0].insertId;
  return idEstoque;
}

export async function alterarProdutoAndEstoque(produto, id) {
  const comando = `
        update tb_produto
        set nm_produto       = ?,
        tp_produto       = ? ,
        vl_produto       = ?,
        img_produto      = ?
        where id_produto = ?
        `;
  let resposta = await con.query(comando, [
    produto.nome,
    produto.tipo,
    produto.valor,
    produto.imagem,
    id,
  ]);

  let produtoAtualizado = resposta[0].affectedRows;

  const comando2 = `
       update tb_estoque
       set qtd_produto      = ?
       where id_estoque = ?
    ;
    `;

  let resposta2 = await con.query(comando2, [produto.quantidade, id]);

  let estoqueAtualizado = resposta2[0].affectedRows;
  return {
    estoqueAtualizado,
    produtoAtualizado,
  };
}

export async function removerProdutoAndEstoque(id) {
  const comandoEstoque = `
    DELETE FROM tb_estoque
    WHERE id_produto = ?;
  `;
  const comandoProduto = `
    DELETE FROM tb_produto
    WHERE id_produto = ?;
  `;

  // Excluindo os registros de estoque primeiro
  await con.query(comandoEstoque, [id]);

  // Agora, excluindo o produto
  let respostaProduto = await con.query(comandoProduto, [id]);

  let linhasAfetadas = respostaProduto[0].affectedRows; // Acessando o número de linhas afetadas na exclusão do produto

  return { linhasAfetadas };
}


export async function consultarEP() {
  let comando = `
    SELECT 
        e.qtd_produto,
        p.nm_produto,
        p.tp_produto,
        p.vl_produto,
        p.img_produto,
        p.id_produto  -- Incluindo explicitamente o id_produto de tb_produto
    FROM 
        tb_estoque e
    INNER JOIN 
        tb_produto p ON e.id_produto = p.id_produto;
  `;
  let resposta = await con.query(comando);
  let registros = resposta[0];

  return registros;
}

export async function listarCategorias() {
  const comando = `
      SELECT DISTINCT nm_servico AS categoria
      FROM tb_agendamento;
  `;

  const [registros] = await con.query(comando);
  return registros;
}

export async function removerProdutosPorCategoria(servico) {
  const produtos = produtosPorServico[servico];

  if (!produtos) {
    throw new Error(`Serviço '${servico}' não encontrado.`);
  }

  for (const { id_produto } of produtos) {
    const comandoDelete = `
      DELETE FROM tb_produto
      WHERE id_produto = ?;
    `;
    await con.query(comandoDelete, [id_produto]);

    const comandoDeleteEstoque = `
      DELETE FROM tb_estoque
      WHERE id_produto = ?;
    `;
    await con.query(comandoDeleteEstoque, [id_produto]);
  }

  return { mensagem: `Produtos da categoria '${servico}' removidos com sucesso!` };
}
