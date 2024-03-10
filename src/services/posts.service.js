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
      { model: User, 
        as: 'user',
        attributes: { exclude: ['password'] }, 
      },

      { 
        model: Category,
        as: 'categories', 
        through: { attributes: [] }, 
      },
      
    ],
 
  });
  return { status: 'SUCCESSFUL', data };
};

module.exports = {
  insertPost,
  getAll,
};