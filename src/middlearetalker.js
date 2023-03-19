const { HTTP_NOT_FOUND_400_STATUS } = require('./variables');
const { HTTP_NOT_FOUND_401_STATUS } = require('./variables');

const validationToken = (req, res, next) => {
    const { authorization } = req.headers;
    const validToken = /^[a-zA-Z0-9]{16}$/;
console.log('authorization: ', authorization);
    if (!authorization) {
        return res.status(HTTP_NOT_FOUND_401_STATUS).json({
            message: 'Token não encontrado',
        });
    }
    
    if (!validToken.test(authorization)) {
        return res.status(HTTP_NOT_FOUND_401_STATUS).json({
            message: 'Token inválido',
        });
    }
    next();
};

const validationName = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(HTTP_NOT_FOUND_400_STATUS).json({
            message: 'O campo "name" é obrigatório',
        });
    }

    if (name.length < 3) {
        return res.status(HTTP_NOT_FOUND_400_STATUS).json({
            message: 'O "name" deve ter pelo menos 3 caracteres',
        });
    }
    next();
};

const validationAge = (req, res, next) => {
    const { age } = req.body;

    if (!age) {
        return res.status(HTTP_NOT_FOUND_400_STATUS).json({
            message: 'O campo "age" é obrigatório',
        });
    }

    if (age < 18 || !Number.isInteger(age)) {
        return res.status(HTTP_NOT_FOUND_400_STATUS).json({
            message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
        });
    }
    next();
};

const validationTalk = (req, res, next) => {
    const { talk } = req.body;

    if (!talk) {
        return res.status(HTTP_NOT_FOUND_400_STATUS).json({
            message: 'O campo "talk" é obrigatório',
        });
    }
    next();
};

const validationTalkWatchedAt = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    const validDate = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!watchedAt) {
        return res.status(HTTP_NOT_FOUND_400_STATUS).json({
            message: 'O campo "watchedAt" é obrigatório',
        });
    }
    if (!validDate.test(watchedAt)) {
        return res.status(HTTP_NOT_FOUND_400_STATUS).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
};

const validationTalkRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;

    if (rate === undefined) {
        return res.status(HTTP_NOT_FOUND_400_STATUS).json({
            message: 'O campo "rate" é obrigatório',
        });
    }

    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
        return res.status(HTTP_NOT_FOUND_400_STATUS).json({
            message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
        });
    }
    next();
};

module.exports = {
    validationToken,
    validationName,
    validationAge,
    validationTalk,
    validationTalkWatchedAt,
    validationTalkRate,
};
