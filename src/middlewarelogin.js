const { HTTP_NOT_FOUND_400_STATUS } = require('./variables');

const validationEmail = (req, res, next) => { 
    const { email } = req.body;
    const validEmail = /\S+@\S+\.\S+/;

    if (!email) {
        return res.status(HTTP_NOT_FOUND_400_STATUS).json({
            message: 'O campo "email" é obrigatório',
        });
    }

    if (!validEmail.test(email)) {
        return res.status(HTTP_NOT_FOUND_400_STATUS).json({
            message: 'O "email" deve ter o formato "email@email.com"',
        });
    }
    next();
};

const validationPassword = (req, res, next) => {
    const { password } = req.body;
    const validPassword = /^\w{6}$/;

    if (!password) {
        return res.status(HTTP_NOT_FOUND_400_STATUS).json({
            message: 'O campo "password" é obrigatório',
        });
    }

    if (!validPassword.test(password)) {
        return res.status(HTTP_NOT_FOUND_400_STATUS).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
        });
    }
    next();
};

module.exports = {
    validationEmail,
    validationPassword,
};
