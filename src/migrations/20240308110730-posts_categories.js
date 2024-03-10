'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('posts_categories', {
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'post_id',
      references: {
        model: 'blog_posts',
        key: 'id'
      },
      
      primaryKey: true
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'category_id',
      references: {
        model: 'categories',
        key: 'id',
      },
      
      primaryKey: true
    }
  })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('posts_categories')
  }
};
