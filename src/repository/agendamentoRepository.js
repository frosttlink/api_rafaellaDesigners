import con from "./connection.js";

export async function adicionarAgendamento(agendamento) {
  const comando = `
    insert into tb_agendamento (dt_agendamento, bl_domicilio, nm_servico, id_cliente,bt_realizado)
    values (?, ?, ?, ?, ?);
  `;

  let registro = await con.query(comando, [
    agendamento.data,
    agendamento.domicilio,
    agendamento.servico,
    agendamento.idCliente,
    agendamento.realizado
  ]);

  let info = registro[0];
  const idAgendamento = info.insertId;

  return idAgendamento;
}

export async function alterarAgendamento(id, agendamento) {
  const comando = `
    update tb_agendamento
      set dt_agendamento = ?,
       bl_domicilio = ?, 
       nm_servico = ?, 
       id_cliente = ?,
       bt_realizado = ?
    where id_agendamento = ?;
  `;

  let resposta = await con.query(comando, [
    agendamento.data,
    agendamento.domicilio,
    agendamento.servico,
    agendamento.idCliente,
    agendamento.realizado,
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

  let resposta = await con.query(comando, [id]);

  let info = resposta[0];
  let linhas = info.affectedRows;

  return linhas;
}

export async function consultarAgendamento() {
  const comando = `
<<<<<<< HEAD
    select id_agendamento,
      dt_agendamento, 
      bl_domicilio,
      nm_servico, 
      id_cliente,
      bt_realizado
      from tb_agendamento;
=======
    SELECT 
  agendamento.id_agendamento, 
  agendamento.dt_agendamento, 
  agendamento.nm_servico, 
  cliente.nm_cliente,
  agendamento.bl_domicilio
FROM 
  tb_agendamento AS agendamento
JOIN 
  tb_cliente AS cliente 
ON 
  agendamento.id_cliente = cliente.id_cliente;
>>>>>>> bf75a4a3bd9598c0876ef1b628f4ddad1c820973
    `;
  let resposta = await con.query(comando);

  let registros = resposta[0];

  return registros;
}

