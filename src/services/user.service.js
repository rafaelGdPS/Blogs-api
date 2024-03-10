const { User } = require('../models');
const jwt = require('../utils/jwt.util');

const insertUser = async (body) => {
  const { email } = body;
  const user = await User.findOne({ where: { email } });
 
  if (user) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }
  await User.create(body);
  const token = jwt.createToken(body);
  return { status: 'CREATED', data: { token } };
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { status: 'SUCCESSFUL', data: users };
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
 
  if (!user) {
    return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  }
  return { status: 'SUCCESSFUL', data: user };
};

module.exports = {
  insertUser,
  getAllUsers,
  getById,
};