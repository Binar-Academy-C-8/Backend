'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chapter.belongsTo(models.Course, {
        foreignKey: 'courseId',
      })
      Chapter.hasMany(models.Content, {
        foreignKey: {
          name: 'chapterId',
        },
        as: 'contents',
      })
    }
  }
  Chapter.init(
    {
      chapterTitle: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Chapter',
    }
  )
  return Chapter
}
