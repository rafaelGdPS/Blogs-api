const { PostCategory, BlogPost, Category, User } = require('../models');

const insertPost = async (body) => {
  const { userId, title, content, categoryIds } = body;
  
  const verifyCategories = categoryIds.map(async (categoryId) => {
    const verify = await Category.findByPk(categoryId); 
    return verify;
  });
  const responses = await Promise.all(verifyCategories);
  if (responses.includes(null)) {
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  }
  const post = await BlogPost.create({ title, content, userId });
  categoryIds.forEach(async (category) => {
    await PostCategory.create({ postId: post.id, categoryId: category });
  });
  return { status: 'CREATED', data: post };
};

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
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!data) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };

  return { status: 'SUCCESSFUL', data };
}; 
const update = async (body, id, userId) => {
  const verifyUser = await BlogPost.findByPk(id);
  console.log(verifyUser);
  if (verifyUser.userId !== userId) { 
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } }; 
  }
  await BlogPost.update(body, { where: { id } });
  const data = await getPostById(id);
  return data;
};
module.exports = {
  insertPost,
  getAll,
  getPostById,
  update,
};