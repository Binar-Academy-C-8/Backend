'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.Chapter, {
        foreignKey: 'courseId',
      });
    }
  }
  Course.init(
    {
      codeCourse: DataTypes.STRING,
      courseName: DataTypes.STRING,
      image: DataTypes.STRING,
      courseType: DataTypes.ENUM(['Free', 'Premium']),
      courseLevel: DataTypes.ENUM(['Beginner', 'Intermediate', 'Advenced']),
      aboutCourse: DataTypes.STRING,
      perpouseCourse: DataTypes.STRING,
      statusCourse: DataTypes.ENUM(['InProgress', 'Complete']),
      progressBar: DataTypes.FLOAT,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Course',
    }
  );
  return Course;
};
