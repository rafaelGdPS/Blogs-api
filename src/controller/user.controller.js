const { userService } = require('../services');
const statusCode = require('../utils/httpMap');

const insertUser = async (req, res) => {
  const { body } = req;

  const { status, data } = await userService.insertUser(body);
  return res.status(statusCode(status)).json(data);
};

const allUsers = async (_req, res) => {
  const { status, data } = await userService.getAllUsers();
  return res.status(statusCode(status)).json(data);
};

const userById = async (req, res) => {
  const { id } = req.params;
  const { data, status } = await userService.getById(id);
  return res.status(statusCode(status)).json(data);
};
const autoDelete = async (req, res) => {
  const { userId } = req.user;
  const { status } = await userService.autoDelete(userId);
  return res.status(statusCode(status)).json();
}; 
module.exports = {
  insertUser,
  allUsers,
  userById,
  autoDelete,
};