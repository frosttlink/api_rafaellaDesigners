import con from "./connection.js";


export async function adicionarAgendamento(agendamento) {
  const comando = `
    insert into tb_agendamentos (id_cliente, dt_agendamento, hr_agendamento, id_servico)
    values (?, ?, ?, ?);
  `;

  let registro = await 
    con.query(comando, [
      agendamento.cliente,
      agendamento.data,
      agendamento.hora,
      agendamento.servico
  ]);

  let info = registro[0];
  const idAgendamento = info.insertId;

  return idAgendamento;
}

export async function alterarAgendamento(id, agendamento) {
  const comando = `
    update tb_agendamento
      set id_cliente = ?, 
        dt_agendamento = ? , 
        hr_agendamento = ?,
        id_servico
    where id_agendamento = ?;
  `;

  let resposta = await 
    con.query(comando, [
      agendamento.cliente,
      agendamento.data,
      agendamento.hora,
      id
  ]);

  let linhasAfetadas = resposta[0].affectedRows;

  return linhasAfetadas;
}

export async function deletarAgendamento(id) {
  const comando = `
    delete 
    from tb_agendamentos
    where id_agendamentos  = ?;
  `;

  let resposta = con.query(comando, [id])
  
  let info = resposta[0]
  let linhas = info.affectedRows

  return linhas;
}

export async function consultarAgendamento(){
    const comando = `
    select id_agendamento     id,
    id_cliente        conteudo,
    dt_agendamento            datas,
    hr_agendamento       hora,
    id_servico        servico
    from tb_agendamento;
    `

    let resposta = con.query(comando, [id])
  
  let info = resposta[0]
  let linhas = info.affectedRows

  return linhas
}