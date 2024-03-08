const { userService } = require('../services');
const statusCode = require('../utils/httpMap');

const insertUser = async (req, res) => {
  const { body } = req;

  const { status, data } = await userService.insertUser(body);
  return res.status(statusCode(status)).json(data);
};

module.exports = {
  insertUser,
};