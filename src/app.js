const express = require('express');
const { loginController, userController, categoriesController } = require('./controller');
const { validateName, validateEmail, validatePassword, validateAuth } = require('./middleware');
const validateDislplayName = require('./middleware/validateDislplayName');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

app.post('/login', loginController.login);

app.post('/user', validateDislplayName, validateEmail, validatePassword, userController.insertUser);
app.get('/user/:id', validateAuth, userController.userById);
app.get('/user', validateAuth, userController.allUsers);

app.post('/categories', validateAuth, validateName, categoriesController.insert);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
