import con from "./connection.js";

export async function adicionarServico(servico) {
  const comando = `
    insert into tb_servicos (ds_servico, vl_servico, img_servico, ds_disponivel)
    values (?, ?, ?, ?);
  `;

  let registro = await 
    con.query(comando, [
      servico.descricao,
      servico.valor,
      servico.imagem,
      servico.disponivel,
  ]);

  let info = registro[0];
  const idServico = info.insertId;

  return idServico;
}

export async function alterarServico(id, servico) {
  const comando = `
    update tb_servicos
      set ds_servico = ?, 
        vl_servico = ? , 
        ds_disponivel = ?
    where id_servico = ?;
  `;

  let resposta = await 
    con.query(comando, [
      servico.descricao,
      servico.valor,
      servico.disponivel,
      id
  ]);

  let linhasAfetadas = resposta[0].affectedRows;

  return linhasAfetadas;
}

export async function deletarServico(id) {
  const comando = `
    delete 
    from tb_servicos
    where id_servico  = ?;
  `;

  let resposta = con.query(comando, [id])
  
  let info = resposta[0]
  let linhas = info.affectedRows

  return linhas;
}
