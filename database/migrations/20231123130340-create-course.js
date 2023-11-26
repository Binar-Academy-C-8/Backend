'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      courseCode: {
        type: Sequelize.STRING,
      },
      courseName: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      courseType: {
        type: Sequelize.ENUM(['free', 'premium']),
      },
      courseLevel: {
        type: Sequelize.ENUM(['beginner', 'intermediate', 'advance']),
      },
      aboutCourse: {
        type: Sequelize.STRING,
      },
      intendedFor: {
        type: Sequelize.STRING,
      },
      courseStatus: {
        type: Sequelize.ENUM(['inProgress', 'completed']),
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  },
};
