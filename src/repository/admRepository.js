import con from "./connection.js";

export async function addAdm(adm){
    let comando = `
    insert into tb_adm(nm_adm, ds_email,ds_senha)
    values (?,?,?)
    `;
    let resposta = await con.query (comando, [
        adm.nome,
        adm.email,
        adm.senha
    ]);
    let info = resposta[0];
    let idAdm = info.insertId;

    return idAdm
}

export async function alterarAdm(id,adm){
    let comando = `
    update tb_adm
    set nm_adm = ? 
        ds_email = ?,
        ds_senha = ?
    where id_adm = ?
    `;
    let resposta = await con.query (comando, [
        adm.nome,
        adm.email,
        adm.senha,
        id
    ]);

    let info = resposta[0];
    let linhas = info.affectedRows;

    return linhas
}

export async function deletarAdm(id){

    let comando = `
    delete from tb_adm where id_adm = ?
    `;
        let resposta = await con.query (comando, [ 
        id
    ]);
    
    let info = resposta[0];
    let linhas = info.affectedRows;

    return linhas;
}

export async function consultarAdm(){

    let comando = `
    select ds_email,
    ds_senha
    from tb_adm
    `;
    let resposta = await con.query(comando);

    let registros = resposta[0]
    return registros
}


export async function validarAdm(adm){
    let comando = `
    select 
    id_adm id,
    nm_adm nome
    from tb_adm 
    where (nm_usuario = ? or ds_email = ?)
          and ds_senha = ?
    
    `

    let registros = await con.query(comando, [adm.nome, adm.email, adm.senha,])
    return registros[0][0]
}