import con from "./connection.js";

export async function adicionarAgendamento(agendamento) {
  const comando = `
  INSERT INTO tb_agendamento (dt_agendamento, bl_domicilio, nm_servico, id_cliente, nm_endereco, bt_realizado)
  VALUES (?, ?, ?, ?, ?, ?);
`;

  let registro = await con.query(comando, [
    agendamento.data,
    agendamento.domicilio,
    agendamento.servico,
    agendamento.idCliente,
    agendamento.endereco || null,
    agendamento.realizado || false,
  ]);

  let info = registro[0];
  const idAgendamento = info.insertId;

  return idAgendamento;
}

export async function alterarAgendamento(id, agendamento) {
  const comando = `
  UPDATE tb_agendamento
  SET dt_agendamento = ?,
      bl_domicilio = ?, 
      nm_servico = ?, 
      id_cliente = ?,
      nm_endereco = ?,  -- Atualize o endereço
      bt_realizado = ?
  WHERE id_agendamento = ?;
`;

  let resposta = await con.query(comando, [
    agendamento.data,
    agendamento.domicilio,
    agendamento.servico,
    agendamento.idCliente,
    agendamento.endereco || null, 
    agendamento.realizado || false,
    id,
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
  SELECT 
    agendamento.id_agendamento, 
    agendamento.dt_agendamento, 
    agendamento.nm_servico, 
    cliente.nm_cliente,
    agendamento.bl_domicilio,
    agendamento.nm_endereco
  FROM 
    tb_agendamento AS agendamento
  JOIN 
    tb_cliente AS cliente 
  ON 
    agendamento.id_cliente = cliente.id_cliente;
`;

  let resposta = await con.query(comando);
  let registros = resposta[0];

  console.log(registros);  // Verifique se o campo nm_endereco está vindo corretamente.
  return registros;
}
