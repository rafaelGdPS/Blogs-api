const { loginService } = require('../services');
const statusCode = require('../utils/httpMap');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { status, data } = await loginService.login(email, password);

  return res.status(statusCode(status)).json(data);
};

module.exports = {
  login,
};