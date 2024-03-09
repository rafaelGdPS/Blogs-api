const { categoriesService } = require('../services');
const statusCode = require('../utils/httpMap');

const insert = async (req, res) => {
  const { body } = req;
  const { data, status } = await categoriesService.insert(body);
  return res.status(statusCode(status)).json(data);
};

const getAll = async (_req, res) => {
  const { data, status } = await categoriesService.getAll();
  return res.status(statusCode(status)).json(data);
};

module.exports = {
  insert,
  getAll,
};