'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CourseUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CourseUser.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  CourseUser.init(
    {
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CourseUser',
    }
  )
  return CourseUser
}
