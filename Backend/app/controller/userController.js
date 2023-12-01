const { User, Auth } = require('../models');
const ApiError = require('../../utils/apiError');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const updateUser = async (req, res, next) => {
  const { name, phoneNumber, country, city, image } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        name: name,
        id: { [Op.not]: req.params.id },
      },
    });

    if (existingUser) {
      return next(new ApiError('Name already taken', 400));
    }

    const newUser = await User.update(
      {
        name,
        phoneNumber,
        country,
        city,
        image,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (newUser == 0) {
      return next(new ApiError('User not found', 404));
    }

    res.status(200).json({
      status: 'Success',
      message: 'Updated successfully',
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return next(new ApiError('The user with this Id was not found', 404));
    }

    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    await Auth.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: 'Success',
      message: 'Deleted successfully',
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  updateUser,
  deleteUser,
};
