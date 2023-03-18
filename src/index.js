const express = require('express');
const fs = require('fs');
const path = require('path');
const tokengenerate = require('./tokengenerate');
const { validationEmail, validationPassword } = require('./middlewarelogin');
const {
    HTTP_OK_STATUS,
    HTTP_NOT_FOUND_404_STATUS,
    PORT,
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

app.listen(PORT, () => {
    console.log('Online');
});
