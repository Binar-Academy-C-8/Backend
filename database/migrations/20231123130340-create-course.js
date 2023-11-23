'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codeCourse: {
        type: Sequelize.STRING
      },
      courseName: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      courseType: {
        type: Sequelize.ENUM
      },
      courseLevel: {
        type: Sequelize.ENUM
      },
      abaouCourse: {
        type: Sequelize.STRING
      },
      perpouseCourse: {
        type: Sequelize.STRING
      },
      statusCourse: {
        type: Sequelize.ENUM
      },
      progressBar: {
        type: Sequelize.FLOAT
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};