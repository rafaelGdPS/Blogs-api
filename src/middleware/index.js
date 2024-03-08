const validateName = require('./validateDislplayName');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const validateAuth = require('./validateAuth');

module.exports = {
  validateEmail,
  validateName,
  validatePassword,
  validateAuth,
};