'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    displayName: {
      type: Sequelize.STRING(255),
      field: 'display_name'
    },
    email: {
      type: Sequelize.STRING(255)
    },
    password: {
      type: Sequelize.STRING(255),
    },
    image: {
      type: Sequelize.STRING(255)
    }
  })
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.dropTable('users')
  }
};
