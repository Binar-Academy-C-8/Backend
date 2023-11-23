'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init({
    codeCourse: DataTypes.STRING,
    courseName: DataTypes.STRING,
    image: DataTypes.STRING,
    courseType: DataTypes.ENUM,
    courseLevel: DataTypes.ENUM,
    abaouCourse: DataTypes.STRING,
    perpouseCourse: DataTypes.STRING,
    statusCourse: DataTypes.ENUM,
    progressBar: DataTypes.FLOAT,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};