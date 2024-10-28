import con from "./connection.js";

export async function adicionarProduto(produto) {
    const comando = `
        insert into tb_produto(nm,produto,tp_produto,qtd_produto,id_produto, img_produto)
        values
        (?,?,?,?,?,?)
        ;
    `

    let resposta = await con.query(comando, [produto.nm_produto, produto.tp_produto, produto.quantidade, produto.valor, produto.img_produto]);

    let info = resposta[0];
    return info.insertId;
}



export async function consultarProduto() {
    let comando = `
    select id_produto	id,
    nm_produto          nome,
    tp_produto          tipo,
    vl_produto			valor,
    qtd_produto			quantidade,
    img_produto			imagem
    from tb_produtos;
    `
    let resposta = await con.query(comando);
    let registros = resposta[0];

    return registros;
}

export async function consultarIDProduto(id) {
    let comando = `
    select id_produto	id,
    nm_produto          nome,
    tp_produto          tipo,
    vl_produto			valor,
    qtd_produto			quantidade,
    img_produto			imagem
    from tb_produtos
    where id_produto = ?
    `
    let resposta = await con.query(comando, [id]);
    let registros = resposta[0];

    return registros;
}

export async function alterarProduto(produto, id) {
    const comando = `
    update tb_produto
    set nm_produto  = ? ,
    tp_produto       = ? ,
    vl_produto		= ?	,
    img_produto		= ?	
    where id_produto
    `
    let resposta = await con.query(comando, [produto.nm_produto, produto.tp_produto, produto.quantidade, produto.valor, produto.img_produto, id]);

    let info = resposta[0];

    return info.affectedRows;
}

export async function removerProduto(id) {
    const comando = `
    delete from tb_produtos
    where id_produto = ?;
    `

    let resposta = await con.query(comando, [id]);

    let info = resposta[0];
    return info.affectedRows
}

export async function alterarImagemProduto(id, caminho) {
    const comando = ` 
      update tb_produtos 
        set img_produto = ?
      where id_produto = ?;
    `;

    let resposta = await con.query(comando, [caminho, id]);
    let info = resposta[0];

    return info.affectedRows;
}