const express = require('express');
// const talker = require('./talker.json');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  const filePath = path.join(__dirname, 'talker.json'); 
  const data = fs.readFileSync(filePath);
  const talker = JSON.parse(data);
  console.log(talker);

  if (talker) {
    res.status(HTTP_OK_STATUS).json(talker);
  } else {
    res.status(HTTP_OK_STATUS).json([]);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
