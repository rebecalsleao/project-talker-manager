const express = require('express');
const fs = require('fs');
const path = require('path');
const tokengenerate = require('./tokengenerate');
const { validationEmail, validationPassword } = require('./middlewarelogin');
const { validationToken,
    validationName,
    validationAge,
    validationTalk,
    validationTalkWatchedAt,
    validationTalkRate } = require('./middlearetalker');
const { 
        HTTP_OK_STATUS, 
        HTTP_NOT_FOUND_404_STATUS, 
        PORT, HTTP_CREATED_STATUS,
    } = require('./variables');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.status(HTTP_OK_STATUS).send());

app.get('/talker', (req, res) => {
    const filePath = path.join(__dirname, 'talker.json');
    const data = fs.readFileSync(filePath);
    const talker = JSON.parse(data);

    if (talker) {
        res.status(HTTP_OK_STATUS).json(talker);
    } else {
        return res.status(HTTP_OK_STATUS).json([]);
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
        return res.status(HTTP_NOT_FOUND_404_STATUS).json({
            message: 'Pessoa palestrante não encontrada',
        });
    }
});

app.post('/login', validationEmail, validationPassword, async (req, res) => {
    let token = '';
    token = tokengenerate(16);

    return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', validationToken,
validationName,
validationAge,
validationTalk,
validationTalkWatchedAt,
validationTalkRate, 
async (req, res) => {
    const talker = req.body;
    const filePath = path.join(__dirname, 'talker.json');
    const data = fs.readFileSync(filePath);
    const talkers = JSON.parse(data);
    talker.id = talkers.length + 1;

    talkers.push(talker);
    fs.writeFileSync(filePath, JSON.stringify(talkers));

    return res.status(HTTP_CREATED_STATUS).json(talker);
});

app.put('/talker/:id',
    validationToken,
    validationName,
    validationAge,
    validationTalk,
    validationTalkWatchedAt,
    validationTalkRate,
    async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const filePath = path.join(__dirname, 'talker.json');
    const data = fs.readFileSync(filePath);
    const talkers = JSON.parse(data);
  
    const index = talkers.findIndex((talker) => talker.id === Number(id));
  
    if (index === -1 || !id) {
return res.status(HTTP_NOT_FOUND_404_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
    }

    const updatedTalker = { id: Number(id), name, age, talk };
    talkers.splice(index, 1, updatedTalker);
    fs.writeFileSync(filePath, JSON.stringify(talkers));

   return res.status(HTTP_OK_STATUS).json(updatedTalker);
  });

app.listen(PORT, () => {
    console.log('Online');
});
