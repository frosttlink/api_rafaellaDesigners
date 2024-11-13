create database db_tcc1;

use db_tcc1;

CREATE TABLE tb_adm (
  id_adm int primary key auto_increment,
  ds_email varchar(200) ,
  nm_adm varchar(200) ,
  ds_senha varchar(200) ,
);

CREATE TABLE tb_agendamento (
  id_agendamento int primary key auto_increment,
  ds_horario varchar(70) ,
  dt_agendamento date ,
  atendimento_domicilio tinyint(1) ,
  nm_servico varchar(200) ,
  nm_cliente varchar(200) ,
  ds_cep varchar(200)  
);

CREATE TABLE tb_estoque (
  id_estoque int primary key auto_increment,
  qtd_produto int ,
  id_produto int ,
  KEY id_produto (id_produto),
  CONSTRAINT tb_estoque_ibfk_1 FOREIGN KEY (id_produto) REFERENCES tb_produto (id_produto)
);

CREATE TABLE tb_produto (
  id_produto int NOT NULL AUTO_INCREMENT,
  nm_produto varchar(200) ,
  tp_produto varchar(200) ,
  vl_produto decimal(15,2) ,
  img_produto varchar(500) 
);

CREATE TABLE tb_servicos (
  id_servico int primary key auto_increment,
  ds_servico varchar(150) ,
  vl_servico decimal(10,2) ,
  img_servico varchar(700) ,
  ds_disponivel varchar(500)
);

alter table tb_cliente change column nr_cliente ds_telefone varchar(200);
alter table tb_cliente change column nr_cep ds_cep varchar(200);
alter table tb_cliente add column nr_casa varchar(200);