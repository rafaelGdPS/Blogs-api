module.exports = (req, res, next) => {
  const { email } = req.body;

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validate = regex.test(email);
  console.log(email);
  console.log(validate);
  if (!email) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (!validate) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};