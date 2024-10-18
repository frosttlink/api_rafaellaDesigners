import con from "./connection.js";

export async function addEndereco(endereco){
    let comando = `
    insert into tb_endereco(nr_cep, nm_rua, nr_casa)
    values (?,?,?)
    `;
    let resposta = await con.query (comando, [
        endereco.cep,
        endereco.rua,
        endereco.casa
    ]);
    let info = resposta[0];
    let idEndereco = info.insertId;

    return idEndereco
}

export async function alterarEndereco(id,endereco){
    let comando = `
    update tb_endereco
    set nr_cep = ?,
     nm_rua = ?,
    nr_casa = ?
    where id_endereco = ?
    `;
    let resposta = await con.query (comando, [
        endereco.cep,
        endereco.rua,
        endereco.casa,
        id
    ]);

    let info = resposta[0];
    let linhas = info.affectedRows;

    return linhas
}

export async function deletarEndereco(id){

    let comando = `
    delete from tb_endereco where id_endereco = ?
    `;
        let resposta = await con.query (comando, [ 
        id
    ]);
    
    let info = resposta[0];
    let linhas = info.affectedRows;

    return linhas;
}

