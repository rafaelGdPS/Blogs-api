const express = require('express');
const { loginController, 
  userController, categoriesController, postController } = require('./controller');
const { validateName, 
  validateEmail, validatePassword, validateAuth, validateInput } = require('./middleware');
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
app.get('/categories', validateAuth, categoriesController.getAll);

app.post('/post', validateAuth, validateInput, postController.insert);
app.get('/post', validateAuth, postController.getAll);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
