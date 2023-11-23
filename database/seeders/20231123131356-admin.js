'use strict';

const { User } = require('../../app/models');
const dotenv = require('dotenv');
dotenv.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'adminc8',
        phoneNumber: '+628236576342564',
        country: 'Indonesia',
        city: 'Jakarta',
        role: 'admin',
        image: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const users = await User.findAll();

    await queryInterface.bulkInsert('Auths', [
      {
        email: 'adminc8@mail.com',
        password: process.env.PASSWORD_HASH,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Auths', null, {});
  },
};
