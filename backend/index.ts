const app = require('express')();
const consign = require('consign');
const db = require('./config/db.ts')

app.db = db; 

consign()
.then('./config/middlewares.ts')
.then('./api')
.then('./config/routes.ts')
.then('./database/connection.ts')   // Conexão com o banco de dados (tem que adaptar)
.into(app)


app.listen(3333, () => {
  console.log('Backend executando...')
});