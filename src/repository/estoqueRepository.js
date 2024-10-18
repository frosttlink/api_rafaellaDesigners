import con from "./connection.js";

export async function adcionarEstoque(estoque){
    const comando = `
        insert into tb_estoque(qtd_produto,id_produto)
        values
        (?,?)
        ;
    `
    let resposta = await con.query(comando,[estoque.quantidade, estoque.produto]);

    let info = resposta[0];
    return info.insertId;
}

export async function consultarEstoque(){
    let comando = `
    select id_produto_estoque	id,
            qtd_produto         qtd,
            id_produto          id
    from tb_estoque;
    `
    let resposta = await con.query(comando);
    let registros = resposta[0];

    return registros;
}

export async function consultarIDEstoque(id){
    let comando = `
    select id_produto_estoque	id,
    qtd_produto         qtd,
    id_produto          pd
    from tb_estoque
    where id_produto_estoque = ?
    `
    let resposta = await con.query(comando,[id]);
    let registros = resposta[0];

    return registros;
}

export async function alterarEstoque(estoque,id){
    const comando = `
    update tb_estoque 
    set qtd_produto = ?,
        id_produto = ?
    where id_produto_estoque = ?
`;

    let resposta = await con.query(comando,[estoque.quantidade, estoque.produto, id]);

    let info = resposta[0];

    return info.affectedRows;
}

export async function removerEstoque(id){
    const comando = `
    delete from tb_estoque
    where id_produto_estoque = ?;
    `

    let resposta = await con.query(comando,[id]);

    let info = resposta[0];
    return info.affectedRows
}