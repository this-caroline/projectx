const express = require('express');
const Router = express.Router();

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const ContentController = require('./controllers/ContentController');
const SessionController = require('./controllers/SessionController');
const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    try {
        const data = req.headers["authorization"]
        if (!data) return res.status(401).json({
            success: false,
            message: 'authentication is mandatory'
        })

        const token = data.split(" ")[1];
        const user  = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = user.userId
        req.email = user.email
        req.isAdmin = user.isAdmin
        next()
    }catch(e){
        return res.status(401).json({
            success: false,
            message: 'Unable to authenticate'
        })
    }
}

// Login da aplicação utilizando o conceito de Sessões ou JSON Web Token
Router.post('/auth/validate', AuthController.store);
Router.post('/session', SessionController.store);

//a cadastro do usuário. deve apresentar validação de existência dos campos
//unicidade do login e email.Router.post('/user', AppointmentController.store);
Router.post('/user', UserController.store);
Router.get('/user', isAuth, UserController.index);
Router.patch('/user/:id', isAuth, UserController.update);

//deve ser capaz de publicar conteúdos textuais, imagens ou videos no seu próprio perfil. P
Router.post('/user/:user_id/content', isAuth);
Router.get('/user/:user_id/content', isAuth);

//cada usuário deve ser capaz de realizar buscas nos conteúdos publicados.
Router.get('/content', isAuth, ContentController.index);
Router.post('/content', isAuth, ContentController.store);
Router.patch('/content', isAuth,  ContentController.update);

module.exports = Router;
