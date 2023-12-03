'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Course, {
        foreignKey: {
          name: 'courseId',
          allowNull: false,
        },
      });
    }
  }
  Transaction.init(
    {
      courseName: DataTypes.STRING,
      ppn: DataTypes.FLOAT,
      totalPrice: DataTypes.INTEGER,
      paymentStatus: DataTypes.BOOLEAN,
      paymentMethod: DataTypes.ENUM(['credit', 'debit']),
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
