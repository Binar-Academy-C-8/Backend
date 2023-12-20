const { Op, where } = require('sequelize')
const path = require('path')
const {
  Course,
  Chapter,
  Content,
  Category,
  User,
  CourseUser,
  Transaction,
  Sequelize,
  Notification,
  NotificationRead,
} = require('../models')
const ApiError = require('../../utils/apiError')
const imagekit = require('../libs/imagekit')

const getAllCourse = async (req, res, next) => {
  try {
    const { search, category, level, type, sort_by, order_by } = req.query

    const filter = {}
    const order = []

    if (search) {
      filter.courseName = { [Op.iLike]: `%${search}%` }
    }

    if (category) {
      filter.categoryId = category
    }

    if (type) {
      const types = ['Free', 'Premium']
      if (!types.includes(type)) {
        return next(new ApiError('tipe kursus tidak valid', 400))
      }
      filter.courseType = type
    }

    if (level) {
      const levels = ['Beginner', 'Intermediate', 'Advanced']
      if (!levels.includes(level)) {
        return next(new ApiError('level tidak valid', 400))
      }
      filter.courseLevel = level
    }

    if (sort_by && !order_by) {
      return next(
        new ApiError('query parameter order_by tidak boleh kosong', 400)
      )
    }

    if (!sort_by && order_by) {
      return next(
        new ApiError('query parameter sort_by tidak boleh kosong', 400)
      )
    }

    if (sort_by && order_by) {
      if (!['asc', 'desc'].includes(order_by.toLowerCase())) {
        return next(
          new ApiError(
            'tolong isi query parameter order_by dengan asc atau desc',
            400
          )
        )
      }
      order.push([sort_by, order_by.toUpperCase()])
    }

    const getCourses = await Course.findAll({
      where: { ...filter },
      attributes: {
        exclude: ['aboutCourse', 'intendedFor', 'telegramGroup'],
      },
      include: [
        { model: Category, as: 'category' },
        { model: User, as: 'courseBy' },
        {
          model: Chapter,
          as: 'chapters',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: Content,
              as: 'contents',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        },
      ],
      order,
    })

    const mapCourse = Promise.all(
      getCourses.map(async (course) => {
        const chaptersByCourseId = course.toJSON().chapters
        const contents = chaptersByCourseId.map((chapter) => {
          const contents = chapter.contents.map((content) => {
            return content
          })
          return contents
        })

        const totalDurationPerChapter = contents.map((content) => {
          const sumDuration = content.reduce((acc, curr) => {
            const duration = curr.duration.split(':')
            const minutes = parseInt(duration[0])
            const second =
              duration[1] !== '00' ? parseFloat(duration[1] / 60) : 0
            return (acc += minutes + second)
          }, 0)
          return sumDuration
        })

        const totalDurationPerCourse = totalDurationPerChapter.reduce(
          (acc, curr) => acc + curr,
          0
        )

        const modulePerCourse = await Chapter.count({
          where: {
            courseId: course.id,
          },
        })

        const isDiscount = course.courseDiscountInPercent > 0 ? true : false
        const rawPrice =
          course.coursePrice / (1 - course.courseDiscountInPercent / 100)

        return {
          ...course.toJSON(),
          courseBy: course.courseBy.name,
          category: course.category.categoryName,
          rawPrice,
          durationPerCourseInMinutes: Math.round(totalDurationPerCourse),
          isDiscount,
          modulePerCourse,
        }
      })
    )

    const formatedCourses = await mapCourse
    const courses = formatedCourses.map((course) => {
      delete course.chapters
      return course
    })

    res.status(200).json({
      status: 'success',
      data: courses,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getOneCourse = async (req, res, next) => {
  try {
    const isCourseEnrolled = await CourseUser.findOne({
      where: { courseId: req.params.id, userId: req.user.id },
    })

    const getCourse = await Course.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'category' },
        { model: User, as: 'courseBy' },
        {
          model: Chapter,
          as: 'chapters',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: Content,
              as: 'contents',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        },
      ],
    })

    const course = getCourse.toJSON()

    const modulePerCourse = await Chapter.count({
      where: {
        courseId: req.params.id,
      },
    })

    const contentIndex = course.chapters.flatMap((chapter) => {
      return chapter.contents.map((content) => {
        return content.id
      })
    })

    const getChapterDuration = Promise.all(
      course.chapters.map(async (chapter) => {
        const contents = await Content.findAll({
          where: { chapterId: chapter.id },
          raw: true,
        })
        const totalDuration = contents.reduce((acc, curr) => {
          const duration = curr.duration.split(':')
          const minutes = parseInt(duration[0])
          const seconds = parseFloat(duration[1] / 60)
          return (acc += minutes + seconds)
        }, 0)
        return totalDuration
      })
    )
    const chapterDuration = await getChapterDuration

    const totalCourseDuration = chapterDuration.reduce((acc, curr) => {
      return acc + curr
    }, 0)

    const resChapter = course.chapters.map((chapter, i) => {
      chapter.contents = chapter.contents.map((content) => {
        content.isLocked = false
        content.isWatched = false
        if (
          isCourseEnrolled &&
          content.id < contentIndex[isCourseEnrolled.contentFinished]
        ) {
          content.isWatched = true
        }
        if (
          (!isCourseEnrolled && content.id >= contentIndex[1]) ||
          (isCourseEnrolled &&
            content.id > contentIndex[isCourseEnrolled.contentFinished])
        ) {
          content.isLocked = true
          content.message = !isCourseEnrolled
            ? 'Silahkan tambahkan ke kelas berjalan untuk bisa mengakses semua video'
            : 'Silahkan tonton video sebelumnya, untuk mengakses video selanjutnya'
        }
        return content
      })

      return {
        ...chapter,
        contents: chapter.contents,
        durationPerChapterInMinutes: Math.round(chapterDuration[i]),
      }
    })

    const rawPrice =
      course.coursePrice / (1 - course.courseDiscountInPercent / 100)

    res.status(200).json({
      status: 'success',
      data: {
        ...course,
        courseBy: course.courseBy.name,
        category: course.category.categoryName,
        chapters: resChapter,
        rawPrice,
        modulePerCourse,
        durationPerCourseInMinutes: Math.round(totalCourseDuration),
      },
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const createCourse = async (req, res, next) => {
  const courseBody = req.body
  const file = req.file
  let image

  try {
    if (file) {
      const filename = file.originalname
      const extension = path.extname(filename)
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      })
      image = uploadedImage.url
    }

    const { coursePrice, courseDiscountInPercent } = courseBody

    if (courseDiscountInPercent) {
      courseBody.coursePrice =
        coursePrice - (coursePrice * courseDiscountInPercent) / 100
    }

    const newCourse = await Course.create({
      ...courseBody,
      userId: req.user.id,
      image,
    })
    const notif = await Notification.create({
      titleNotification: 'Kelas',
      typeNotification: 'Promosi',
      courseId: newCourse.id,
      description: `Kelas ${newCourse.courseName} telah ditambahkan, Ayo daftar kelas! *Syarat dan ketentuan berlaku`,
    })
    await NotificationRead.create({
      notifId: notif.id,
    })

    res.status(201).json({
      status: 'success',
      data: { ...newCourse.toJSON(), rawCoursePrice: coursePrice },
    })
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      const field = err.errors[0].path
      return next(new ApiError(`${field} tidak boleh kosong`, 400))
    }
    next(new ApiError(err.message, 500))
  }
}

const updateCourse = async (req, res, next) => {
  const id = req.params.id
  const courseBody = req.body
  const file = req.file
  const condition = { where: { id }, returning: true }
  let image

  try {
    if (file) {
      const filename = file.originalname
      const extension = path.extname(filename)
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      })
      image = uploadedImage.url
    }

    const { coursePrice, courseDiscountInPercent } = courseBody

    if (courseDiscountInPercent) {
      courseBody.coursePrice =
        coursePrice - (coursePrice * courseDiscountInPercent) / 100
    }

    const updatedCourse = await Course.update(
      { ...courseBody, userId: req.user.id, image },
      condition
    )

    res.status(200).json({
      status: 'success',
      message: `Berhasil memperbarui data kursus dengan id ${id}`,
      data: { ...updatedCourse[1][0].toJSON(), rawPrice: coursePrice },
    })
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      const field = err.errors[0].path
      return next(new ApiError(`${field} tidak boleh kosong`, 400))
    }
    next(new ApiError(err.message, 500))
  }
}

const deleteCourse = async (req, res, next) => {
  const id = req.params.id
  const condition = { where: { id } }
  try {
    const chapters = await Chapter.findAll({
      where: {
        courseId: id,
      },
      include: [
        {
          model: Content,
          as: 'contents',
        },
      ],
    })

    Promise.all(
      chapters.flatMap(async (chapter) => {
        await Content.destroy({ where: { chapterId: chapter.id } })
      })
    )

    await Chapter.destroy({ where: { courseId: id } })
    await Course.destroy(condition)

    res.status(200).json({
      status: 'success',
      message: `Berhasil menghapus course dengan id ${id}`,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = {
  getAllCourse,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse,
}
