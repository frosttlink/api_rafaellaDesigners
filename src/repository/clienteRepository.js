import con from "./connection.js";
export async function addCliente(cliente){
    let comando = `
    insert into tb_cliente(nm_cliente, ds_telefone, ds_cep, nm_rua, nr_casa)
    values (?,?,?,?,?)
    `;
    let resposta = await con.query (comando, [
        cliente.nome,
        cliente.telefone,
        cliente.cep,
        cliente.rua,
        cliente.casaNumero
    ]);
    let info = resposta[0];
    let idCLiente = info.insertId;
    return idCLiente
}
export async function alterarCliente(id,cliente){
    let comando = `
    update tb_cliente 
    set nm_cliente = ?,
        ds_telefone = ?,
        ds_cep = ?,
        nm_rua = ?,
        nr_casa = ?
    where id_cliente = ?
    `;
    let resposta = await con.query (comando, [
        cliente.nome,
        cliente.telefone,
        cliente.cep,
        cliente.rua,
        cliente.casaNumero,
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

export async function deletarAgendamentosPorCliente(idCliente) {
    let comando = `
        DELETE FROM tb_agendamento WHERE id_cliente = ?;
    `;
    let resposta = await con.query(comando, [idCliente]);
    let info = resposta[0];
    let linhas = info.affectedRows;
    return linhas;
}

export async function consultarCliente(){
    let comando = `
    select id_cliente, nm_cliente, ds_telefone, ds_cep, nm_rua, nr_casa
    from tb_cliente
    `;
    let resposta = await con.query(comando);
    let registros = resposta[0]
    return registros
}

export async function verificarCliente(nome, telefone) {
    const comando = `
        SELECT *
        FROM tb_cliente
        WHERE nm_cliente = ? AND ds_telefone = ?;
    `;
    
    let resposta = await con.query(comando, [nome, telefone]);
    return resposta[0]; 
}
