const { postService } = require('../services');
const statusCode = require('../utils/httpMap');

const insert = async (req, res) => {
  const { body, user } = req;
  
  const newBody = { ...body, userId: user.userId };
  
  const { data, status } = await postService.insertPost(newBody);
  return res.status(statusCode(status)).json(data);
};

const getAll = async (req, res) => {
  const { data, status } = await postService.getAll();
  return res.status(statusCode(status)).json(data);
};
const getPostById = async (req, res) => {
  const { id } = req.params;
  const { data, status } = await postService.getPostById(id);
  return res.status(statusCode(status)).json(data);
};  
const update = async (req, res) => {
  const { user, body, params } = req;
  const { data, status } = await postService.update(body, params.id, user.userId);
  return res.status(statusCode(status)).json(data);
};
module.exports = {
  insert,
  getAll,
  getPostById,
  update,
};