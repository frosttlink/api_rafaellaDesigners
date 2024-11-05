import con from "./connection.js";
export async function addCliente(cliente){
    let comando = `
    insert into tb_cliente(nm_cliente,nr_cliente, id_endereco)
    values (?,?,?)
    `;
    let resposta = await con.query (comando, [
        cliente.nome,
        cliente.numero,
        cliente.idEndereco
    ]);
    let info = resposta[0];
    let idCLiente = info.insertId;
    return idCLiente
}
export async function alterarCliente(id,cliente){
    let comando = `
    update tb_cliente 
    set nm_cliente = ?,
        nr_cliente = ?,
        id_endereco = ?
    where id_cliente = ?
    `;
    let resposta = await con.query (comando, [
        cliente.nome,
        cliente.numero,
        cliente.idEndereco, 
        id
    ]);
    let info = resposta[0];
    let linhas = info.affectedRows;
    return linhas
}
export async function deletarCliente(id){
    let comando = `
    delete from tb_cliente where id_cliente = ?
    `;
        let resposta = await con.query (comando, [ 
        id
    ]);
    
    let info = resposta[0];
    let linhas = info.affectedRows;
    return linhas;
}
export async function consultarCliente(){
    let comando = `
    select nm_cliente,
    nr_cliente,
    id_endereco
    from tb_cliente
    `;
    let resposta = await con.query(comando);
    let registros = resposta[0]
    return registros
}
