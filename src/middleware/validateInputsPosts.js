module.exports = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  
  // const keys = Object.keys(body);
  // for (let index = 0; index < keys.length; index += 1) {
  //   const key = keys[index];

  //   if (!key) {
  //   }
  // }
  next();
};