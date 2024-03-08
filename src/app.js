const express = require('express');
const { loginController, userController } = require('./controller');
const { validateName, validateEmail, validatePassword } = require('./middleware');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

app.post('/login', loginController.login);

app.post('/user', validateName, validateEmail, validatePassword, userController.insertUser);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
