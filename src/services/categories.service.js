const { Category } = require('../models');

const insert = async (body) => {
  const newCategory = await Category.create(body);
  console.log(newCategory, 'Verificando model');
  return { status: 'CREATED', data: newCategory };
};

module.exports = {
  insert,
};