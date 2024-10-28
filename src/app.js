import express from "express";
import cors from "cors";
import 'dotenv/config.js';
import "./utils/global.js";
import rotas from "./rotas.js";


const servidor = express()

servidor.use(express.json({ limit: '10mb' }));
servidor.use(cors());
servidor.use(express.json());

rotas(servidor);

const PORTA = process.env.PORTA; 
servidor.listen (PORTA, () => console.log(`API SUBIU NA PORTA ${PORTA}`))