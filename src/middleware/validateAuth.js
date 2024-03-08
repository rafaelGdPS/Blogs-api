const { verifyToken } = require('../utils/jwt.util');

module.exports = (req, res, next) => {
  const { authorization: bearerToken } = req.headers;
  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  const token = bearerToken.split(' ')[1];

  try {
    verifyToken(token);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};