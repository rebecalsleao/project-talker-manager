const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = process.env.PORT || '3001';
const NOT_FOUND_MESAGE = {
  message: 'Pessoa palestrante não encontrada',
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  const filePath = path.join(__dirname, 'talker.json'); 
  const data = fs.readFileSync(filePath);
  const talker = JSON.parse(data);

  if (talker) {
    res.status(HTTP_OK_STATUS).json(talker);
  } else {
    res.status(HTTP_OK_STATUS).json([]);
  }
});

app.get('/talker/:id', (req, res) => {
  const filePath = path.join(__dirname, 'talker.json'); 
  const data = fs.readFileSync(filePath);
  const talkers = JSON.parse(data);
  const { id } = req.params;

  const talkerId = talkers.find((talker) => Number(id) === talker.id);

  if (talkerId) {
    res.status(HTTP_OK_STATUS).json(talkerId);
  } else {
    res.status(HTTP_NOT_FOUND_STATUS).json(NOT_FOUND_MESAGE);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
