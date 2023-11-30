'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category, {
        foreignKey: {
          name: 'categoryId',
          allowNull: false,
        },
      })
      Course.hasMany(models.Chapter, {
        foreignKey: {
          name: 'courseId',
          allowNull: false,
        },
      })
    }
  }
  Course.init(
    {
      courseCode: DataTypes.STRING,
      courseName: DataTypes.STRING,
      image: DataTypes.STRING,
      courseType: DataTypes.ENUM(['free', 'premium']),
      courseLevel: DataTypes.ENUM(['beginner', 'intermediate', 'advance']),
      aboutCourse: DataTypes.STRING,
      intendedFor: DataTypes.STRING,
      courseStatus: DataTypes.ENUM(['inProgress', 'completed']),
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Course',
    }
  )
  return Course
}
