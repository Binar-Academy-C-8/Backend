const ApiError = require('../../utils/apiError');
const { Chapter, Course } = require('../models');
require('dotenv').config();

const createChapter = async (req, res, next) => {
  const { chapterTitle } = req.body;
  try {
    if (!chapterTitle) return next(new ApiError('Field must be required', 400));

    // jika sudah ada id course nya
    // let course;
    // if (course.id) {
    //   course = await Course.findOne({
    //     where: { id: course.id },
    //   });
    // } else {
    //   const chapter = await Chapter.findOne({
    //     where: { id: chapter.id },
    //   });
    //   course = await Course.create();
    // }

    const chapter = await Chapter.create({
      chapterTitle,
      //   courseId: course.id,
    });

    res.status(201).json({
      status: 'success',
      data: {
        chapter,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAllChapter = async (req, res, next) => {
  try {
    const chapters = await Chapter.findAll();

    res.status(200).json({
      status: 'success',
      data: {
        chapters,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findChapter = async (req, res, next) => {
  try {
    const chapter = await Chapter.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!chapter) return next(new ApiError('Data not found'), 404);

    res.status(200).json({
      status: 'success',
      data: {
        chapter,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateChapter = async (req, res, next) => {
  try {
    const { chapterTitle } = req.body;

    const chapterId = await Chapter.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!chapterId) return next(new ApiError('Data not found'), 404);

    if (!chapterTitle) return next(new ApiError('Field must be required', 400));

    const chapter = await Chapter.update(
      {
        chapterTitle,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(201).json({
      status: 'success',
      message: 'Successfully updated data',
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const deleteChapter = async (req, res, next) => {
  try {
    const chapterId = await Chapter.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!chapterId) return next(new ApiError('Data not found'), 404);

    const chapter = await Chapter.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully deleted data',
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  createChapter,
  findAllChapter,
  findChapter,
  updateChapter,
  deleteChapter,
};
