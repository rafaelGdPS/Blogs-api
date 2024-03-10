const { Category } = require('../models');

const insert = async (body) => {
  const newCategory = await Category.create(body);
  
  return { status: 'CREATED', data: newCategory };
};

const getAll = async () => {
  const categories = await Category.findAll();
  
  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  insert,
  getAll,
};