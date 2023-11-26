'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.CourseUser, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM(['admin', 'member']),
        defaultValue: 'member',
      },
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
