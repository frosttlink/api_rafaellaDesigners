import con from "./connection.js";

export async function adicionarProduto(produto){
    const comando = `
        insert into tb_produtos(ds_produto,qtd_produto,vl_produto)
        values
        (?,?,?)
        ;
    `
    let resposta = await con.query(comando,[produto.descricao, produto.quantidade, produto.valor]);

    let info = resposta[0];
    return info.insertId;
}

export async function consultarProduto(){
    let comando = `
    select id_produto	id,
    ds_produto			descricao,
    vl_produto			valor,
    qtd_produto			quantidade,
    img_produto			imagem
    from tb_produtos;
    `
    let resposta = await con.query(comando);
    let registros = resposta[0];

    return registros;
}

export async function consultarIDProduto(id){
    let comando = `
    select id_produto	id,
    ds_produto			descricao,
    vl_produto			valor,
    qtd_produto			quantidade,
    img_produto			imagem
    from tb_produtos
    where id_produto = ?
    `
    let resposta = await con.query(comando,[id]);
    let registros = resposta[0];

    return registros;
}

export async function alterarProduto(produto,id){
    const comando = `
    update tb_produtos 
    set ds_produto = ?,
    vl_produto = ?,
    qtd_produto = ?,
    img_produto = ?
    where id_produto = ?
    ;
    `
    let resposta = await con.query(comando,[produto.descricao, produto.valor,produto.quantidade,produto.img,id]);

    let info = resposta[0];

    return info.affectedRows;
}

export async function removerProduto(id){
    const comando = `
    delete from tb_produtos
    where id_produto = ?;
    `

    let resposta = await con.query(comando,[id]);

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