import mysql from  'mysql2/promise'
import "dotenv/config"

let con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,

    typeCast: function (field, next) {
      
        if (field.type === 'TINY' && field.length === 1) {
            return (field.string() === '1'); 
        }
        else if (field.type.includes('DECIMAL')) {
          return Number(field.string());
        }
        else {
            return next();
        }
      }

});

const hora = new Date().toLocaleString();
  console.log('\n\x1b[32m%s\x1b[0m', '🌟 Conexão com o MySQL Estabelecida!');
  console.log('\x1b[36m%s\x1b[0m', `Banco de Dados: ${process.env.MYSQL_DB}`);
  console.log('\x1b[33m%s\x1b[0m', `Hora da Conexão: ${hora}`);
  console.log('--------------------------------------------\n');

export default con;