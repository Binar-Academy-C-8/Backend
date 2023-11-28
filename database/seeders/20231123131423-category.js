'use strict';

const { User } = require('../../app/models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Category', [
      {
        categoryName: 'UI/UX Design',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: 'Web Development',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: 'Data Science',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: 'Android Development',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: 'Business Intellegence',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Category', null, {});
  },
};
