const app = require('express')();
const consign = require('consign');

consign()
  .then('./config/middlewares.ts')
  .then('./api')
  .then('./config/routes.ts')
  .into(app)


app.listen(3333, () => {
  console.log('Backend executando...')
});