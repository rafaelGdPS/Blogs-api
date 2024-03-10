const { PostCategory, BlogPost, Category } = require('../models');

const insertPost = async (body) => {
  const { userId, title, content, categoryIds } = body;
  
  const verifyCategories = categoryIds.map(async (categoryId) => {
    const verify = await Category.findByPk(categoryId); 
    return verify;
  });
  const responses = await Promise.all(verifyCategories);
  
  // const result = await sequelize.transaction(async (t) => {
  if (responses.includes(null)) {
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  }
  const post = await BlogPost.create({ title, content, userId });
  categoryIds.forEach(async (category) => {
    await PostCategory.create({ postId: post.id, categoryId: category });
  });
    
  return { status: 'CREATED', data: post };
  // });
  // console.log(result);
  // return result;
};

module.exports = {
  insertPost,
};