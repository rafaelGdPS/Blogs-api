const { User } = require('../models');
const jwt = require('../utils/jwt.util');

const login = async (email, password) => {
  if (!email || !password) {
    return { status: 'UNAUTHORIZED', data: { message: 'Some required fields are missing' } };
  }
  const user = await User.findOne({
    where: { email },
  });
  if (!user || user.password !== password) {
    return { status: 'UNAUTHORIZED', data: { message: 'Invalid fields' } };
  }
  const token = jwt.createToken({ userId: user.id });
  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = {
  login,
};