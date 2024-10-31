import con from "./connection.js";


export async function adicionarAgendamento(agendamento) {
  const comando = `
    insert into tb_agendamento (nm_cliente, dt_agendamento, ds_horario, nm_servico, atendimento_domicilio,ds_cep)
    values (?, ?, ?, ?, ?,?);
  `;

  let registro = await 
    con.query(comando, [
      agendamento.cliente,
      agendamento.data,
      agendamento.hora,
      agendamento.servico,
      agendamento.atendimento_domicilio,
      agendamento.cep
  ]);

  let info = registro[0];
  const idAgendamento = info.insertId;

  return idAgendamento;
}

export async function alterarAgendamento(id, agendamento) {
  const comando = `
    update tb_agendamento
      set nm_cliente = ?, 
        dt_agendamento = ? , 
        ds_horario = ?,
        nm_servico =?,
        atendimento_domicilio = ?,
        ds_cep = ?
    where id_agendamento = ?;
  `;

  let resposta = await 
    con.query(comando, [
      agendamento.cliente,
      agendamento.data,
      agendamento.hora,
      agendamento.servico,
      agendamento.atendimento_domicilio,
      agendamento.cep,
      id
  ]);

  let linhasAfetadas = resposta[0].affectedRows;

  return linhasAfetadas;
}

export async function deletarAgendamento(id) {
  const comando = `
    delete 
    from tb_agendamento
    where id_agendamento  = ?;
  `;

  let resposta = await con.query(comando, [id])
  
  let info = resposta[0];
  let linhas = info.affectedRows;

  return linhas;
}

export async function consultarAgendamento(){
    const comando = `
    select id_agendamento     id,
    nm_cliente        conteudo,
    dt_agendamento    datas,
    ds_horario    hora,
    nm_servico        servico,
    atendimento_domicilio atend,
    ds_cep      endereco
    from tb_agendamento;
    `;
  let resposta = await con.query(comando)
  
  let registros = resposta[0]

  return registros
}