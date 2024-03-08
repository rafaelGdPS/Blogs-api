const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const createToken = (payload) => {
  const token = jwt.sign(payload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });
  return token;
};

module.exports = {
  createToken,
};