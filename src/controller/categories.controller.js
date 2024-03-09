const { categoriesService } = require('../services');
const statusCode = require('../utils/httpMap');

const insert = async (req, res) => {
  const { body } = req;
  const { data, status } = await categoriesService.insert(body);
  return res.status(statusCode(status)).json(data);
};

module.exports = {
  insert,
};