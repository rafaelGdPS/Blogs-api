/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
  const Category =  sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING(255),
  },
  {
    timestamps: false,
    tableName: 'categories'
  })
  return Category
}