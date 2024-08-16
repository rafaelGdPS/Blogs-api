const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const { PostCategory, BlogPost, Category, User } = require('../models');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const insertPost = async (body) => {
  const { userId, title, content, categoryIds } = body;
  
  const result = await sequelize.transaction(async (t) => {
    const verifyCategories = categoryIds.map(async (categoryId) => {
      const verify = await Category.findByPk(categoryId, { transaction: t }); 
      return verify;
    });

    const responses = await Promise.all(verifyCategories);
    
    if (responses.includes(null)) {
      return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
    }

    const post = await BlogPost.create({ title, content, userId }, { transaction: t });

    await Promise.all(categoryIds.map(async (category) => {
      await PostCategory.create({ postId: post.id, categoryId: category }, { transaction: t });
    }));
    return { status: 'CREATED', data: post };
  });
  console.log(result);
  return result;
};

// const exemplo = async (body) => {
//   const { userId, title, content, categoryIds } = body;

//   const verifyCategories = categoryIds.map(async (categoryId) => {
//     const verify = await Category.findByPk(categoryId); 

//     if (!verify) {
//       return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
//     }
//     await PostCategory.create({ postId: post.id, categoryId: category });

//     return verify;
//   });

//   const post = await BlogPost.create({ title, content, userId });
// }

const getAll = async () => {
  const data = await BlogPost.findAll({  
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 'SUCCESSFUL', data };
};
const getPostById = async (id) => {
  const data = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!data) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  return { status: 'SUCCESSFUL', data };
}; 
const update = async (body, id, userId) => {
  const verifyUser = await BlogPost.findByPk(id);
  if (verifyUser.userId !== userId) { 
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } }; 
  }
  await BlogPost.update(body, { where: { id } });
  const data = await getPostById(id);
  return data;
};
const search = async (q) => {
  const post = await BlogPost
    .findAll({ where: 
      { [Op.or]: [{ title: { [Op.substring]: q } }, { content: { [Op.substring]: q } }] },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
  return { status: 'SUCCESSFUL', data: post };
};
module.exports = {
  insertPost,
  getAll,
  getPostById,
  update,
  search,
};