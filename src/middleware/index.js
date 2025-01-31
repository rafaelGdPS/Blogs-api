const validateDisplayName = require('./validateDislplayName');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const validateAuth = require('./validateAuth');
const validateName = require('./validateCategoriesName');
const validateInput = require('./validateInputsPosts');

module.exports = {
  validateEmail,
  validateName,
  validatePassword,
  validateAuth,
  validateDisplayName,
  validateInput,
};