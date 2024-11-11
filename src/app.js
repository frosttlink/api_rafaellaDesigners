import express from "express";
import cors from "cors";
import 'dotenv/config.js';
import "./utils/global.js";
import rotas from "./rotas.js";

const servidor = express();

servidor.use(express.json({ limit: '10mb' }));
servidor.use(cors());
servidor.use(express.json());

rotas(servidor);

const PORTA = process.env.PORTA;
servidor.listen(PORTA, () => {
  const hora = new Date().toLocaleString();
  console.log('\n\x1b[32m%s\x1b[0m', '🚀 API INICIADA COM SUCESSO');
  console.log('\x1b[34m%s\x1b[0m', `🔌 API SUBIU NA PORTA ${PORTA}`);
  console.log('\x1b[33m%s\x1b[0m', `🕒 Hora de inicialização: ${hora}`);
  console.log('--------------------------------------------\n');
});
