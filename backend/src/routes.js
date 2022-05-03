const express = require('express');
const Router = express.Router();

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const ContentController = require('./controllers/ContentController');
const SessionController = require('./controllers/SessionController');

// Login da aplicação utilizando o conceito de Sessões ou JSON Web Token
Router.post('/auth/validate', AuthController.store);
Router.post('/session', SessionController.store);

//a cadastro do usuário. deve apresentar validação de existência dos campos
//unicidade do login e email.Router.post('/user', AppointmentController.store);
Router.post('/user', UserController.store);
Router.get('/user', UserController.index);

//deve ser capaz de publicar conteúdos textuais, imagens ou videos no seu próprio perfil. P
Router.post('/user/:user_id/content');
Router.get('/user/:user_id/content');

//cada usuário deve ser capaz de realizar buscas nos conteúdos publicados.
Router.get('/content', ContentController.index);
Router.post('/content', ContentController.store);
Router.patch('/content', ContentController.update);

module.exports = Router;
