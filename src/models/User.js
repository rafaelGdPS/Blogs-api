
/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    displayName: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    image: DataTypes.STRING(255),
  },
  {
    timestamps: false,
    underscored: true,
  })

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'userId', as: 'blog_posts'
    })
  }
  return User
}