

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = ( sequelize, DataTypes ) => {
const BlogPost = sequelize.define('BlogPost', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: DataTypes.STRING(255),
  content: DataTypes.STRING(255),
  userId: {type: DataTypes.INTEGER, foreignKey: true},
  published: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
  updated: {type: DataTypes.DATE, defaultValue: DataTypes.NOW} ,
},
{
  timestamps: false,
  underscored: true,
  tableName: 'blog_posts'
})

BlogPost.associate = (models) => {
  BlogPost.belongsTo(models.User, {
    foreignKey: 'userId', as: 'user'
  });
  BlogPost.hasMany(models.PostCategory, {
    foreignKey: 'postId', as: 'posts_categories'
  })

}


return BlogPost
}