import con from "./connection.js";
import crypto from "crypto-js";

export async function addAdm(adm) {
    let comando = `
    insert into tb_adm(nm_adm,ds_email,ds_senha)
    values (?,?,?)
    `;
    let hash = crypto.SHA256(adm.senha).toString();
    let resposta = await con.query(comando, [
        adm.nome,
        adm.email,
        hash
    ]);
    let info = resposta[0];
    let idAdm = info.insertId;
    return idAdm
}

export async function alterarAdm(id, adm) {
    let comando = `
    update tb_adm
    set nm_adm = ? 
        ds_email = ?,
        ds_senha = ?
    where id_adm = ?
    `;

    let hash = crypto.SHA256(adm.senha).toString();
    let resposta = await con.query(comando, [
        adm.nome,
        adm.email,
        hash,
        id
    ]);

    let info = resposta[0];
    let linhas = info.affectedRows;

    return linhas
}

export async function deletarAdm(id) {

    let comando = `
    delete from tb_adm where id_adm = ?
    `;

    let resposta = await con.query(comando, [
        id
    ]);

    let info = resposta[0];
    let linhas = info.affectedRows;

    return linhas;
}

export async function consultarAdm() {

    let comando = `
    select ds_email,
    ds_senha
    from tb_adm
    `;
    let resposta = await con.query(comando);

    let registros = resposta[0]
    return registros
}


export async function validarAdm(adm) {
    let comando = `
    select 
    id_adm id,
    nm_adm nome
    from tb_adm 
    where nm_adm = ? 
        and ds_senha = ?
    
    `
    let hash = crypto.SHA256(adm.senha).toString();
    let registros = await con.query(comando, [adm.nome, hash])
    return registros[0][0]
}