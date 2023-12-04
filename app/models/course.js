'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        as: 'courseBy',
      })
      Course.belongsTo(models.Category, {
        foreignKey: {
          name: 'categoryId',
          allowNull: false,
        },
      })
    }
  }
  Course.init(
    {
      courseCode: { type: DataTypes.STRING, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      courseName: { type: DataTypes.STRING, allowNull: false },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          'https://ik.imagekit.io/xphqqd3ms/image(1).png?updatedAt=1701517286117',
      },
      courseType: {
        type: DataTypes.ENUM(['free', 'premium']),
        allowNull: false,
      },
      courseLevel: {
        type: DataTypes.ENUM(['beginner', 'intermediate', 'advanced']),
        allowNull: false,
      },
      aboutCourse: { type: DataTypes.TEXT },
      intendedFor: { type: DataTypes.TEXT },
      coursePrice: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Course',
    }
  )
  return Course
}
