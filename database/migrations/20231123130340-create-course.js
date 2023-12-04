'use strict'
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
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      courseName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        defaultValue:
          'https://ik.imagekit.io/xphqqd3ms/image(1).png?updatedAt=1701517286117',
        allowNull: false,
      },
      courseType: {
        type: Sequelize.ENUM(['free', 'premium']),
        allowNull: false,
      },
      courseLevel: {
        type: Sequelize.ENUM(['beginner', 'intermediate', 'advanced']),
        allowNull: false,
      },
      aboutCourse: {
        type: Sequelize.TEXT,
      },
      intendedFor: {
        type: Sequelize.TEXT,
      },
      coursePrice: {
        type: Sequelize.FLOAT,
      },
      isPromo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses')
  },
}
