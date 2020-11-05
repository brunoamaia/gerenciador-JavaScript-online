import express from 'express';

const app = express();
app.use(express.json());  // para o node "entender" json

app.listen(3333, () => {
  console.log('Backend executando...')
});