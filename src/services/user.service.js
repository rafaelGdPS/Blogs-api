const { User } = require('../models');
const jwt = require('../utils/jwt.util');

const insertUser = async (body) => {
  const { email } = body;
  const user = await User.findOne({ where: { email } });
  console.log(user, 'service');
  if (user) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }
  await User.create(body);
  const token = jwt.createToken(body);
  return { status: 'CREATED', data: { token } };
};

module.exports = {
  insertUser,
};