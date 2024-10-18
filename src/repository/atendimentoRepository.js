import con from "./connection.js";


export async function adicionarAtendimento(atendimento) {
  const comando = `
    insert into tb_atendimentos (produtos_usados, vl_atend, vl_total_dia, id_servico)
    values (?, ?, ?, ?);
  `;

  let registro = await 
    con.query(comando, [
      atendimento.produtos_usados,
      atendimento.vl_atend,
      atendimento.vl_total_dia,
      atendimento.servico
  ]);

  let info = registro[0];
  const idAtendimento = info.insertId;

  return idAtendimento;
}

export async function alterarAtendimento(id, atendimento) {
  const comando = `
    update tb_agendamento
      set  produtos_usados = ?,  
        vl_atend = ?,
        vl_total_dia = ?,
        id_servico,
    where id_agendamento = ?;
  `;

  let resposta = await 
    con.query(comando, [
      atendimento.produtos,
      atendimento.vl_atend,
      atendimento.vl_dia,
      id
  ]);

  let linhasAfetadas = resposta[0].affectedRows;

  return linhasAfetadas;
}

export async function deletarAtendimento(id) {
  const comando = `
    delete 
    from tb_atendimentos
    where id_atendimentos  = ?;
  `;

  let resposta = con.query(comando, [id])
  
  let info = resposta[0]
  let linhas = info.affectedRows

  return linhas;
}

export async function consultarAtendiamento(){
    const comando = `
    select id_agendamento     id,
    produtos_usados        produtos,
    vl_atend            vl_atend,
    vl_total_dia       vl_dia,
    id_servico        servico
    from tb_agendamento;
    `

    let resposta = con.query(comando, [id])
  
  let info = resposta[0]
  let linhas = info.affectedRows

  return linhas
}