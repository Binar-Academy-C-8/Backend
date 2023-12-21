const {
  User,
  CourseUser,
  Chapter,
  Content,
  Category,
  Course,
  Transaction,

  Notification,
  NotificationRead,
} = require('../models')
const ApiError = require('../../utils/apiError')

const getAllMyCourse = async (req, res, next) => {
  try {
    const filter = {}
    if (req.query.status) {
      if (!['inProgress', 'Selesai'].includes(req.query.status)) {
        return next(new ApiError('Status tidak valid', 400))
      }
      filter.courseStatus = req.query.status
    }
    const getCourseUser = await CourseUser.findAll({
      where: { userId: req.user.id, ...filter },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: {
            exclude: ['aboutCourse', 'intendedFor', 'telegramGroup'],
          },
          include: [
            { model: Category, as: 'category' },
            { model: User, as: 'courseBy' },
            {
              model: Chapter,
              as: 'chapters',
              include: [{ model: Content, as: 'contents' }],
            },
          ],
        },
      ],
    })

    const mapCourse = Promise.all(
      getCourseUser.map(async (courseUser) => {
        const course = courseUser.course
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
        const contentTotal = course.chapters.flatMap((chapter) => {
          return chapter.contents.map((content) => {
            return content.id
          })
        }).length

        const courseProgressInPercentage = Math.round(
          (courseUser.contentFinished / contentTotal) * 100
        )
        const isDiscount = course.courseDiscountInPercent > 0 ? true : false
        const rawPrice =
          course.coursePrice / (1 - course.courseDiscountInPercent / 100)

        return {
          ...course.toJSON(),
          id: courseUser.id,
          contentFinished: courseUser.contentFinished,
          contentTotal,
          courseStatus: courseUser.courseStatus,
          courseProgressInPercentage,
          courseUserId: courseUser.id,
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
      courses,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getOneMyCourse = async (req, res, next) => {
  try {
    const getUserCourse = await CourseUser.findOne({
      where: { id: req.params.courseUserId, userId: req.user.id },
      include: [
        {
          model: Course,
          as: 'course',
          include: [
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
            {
              model: User,
              as: 'courseBy',
            },
            {
              model: Category,
              as: 'category',
            },
          ],
        },
      ],
    })
    if (!getUserCourse) {
      return next(new ApiError('Kurses berjalan tidak ditemukan', 404))
    }
    const myCourse = getUserCourse.toJSON()

    const modulePerCourse = await Chapter.count({
      where: {
        courseId: myCourse.courseId,
      },
    })

    const contentIndex = myCourse.course.chapters.flatMap((chapter) => {
      return chapter.contents.map((content) => {
        return content.id
      })
    })

    const getChapterDuration = Promise.all(
      myCourse.course.chapters.map(async (chapter) => {
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

    const resChapter = myCourse.course.chapters.map((chapter, i) => {
      chapter.contents = chapter.contents.map((content) => {
        content.isWatched = false
        content.isLocked = false
        if (content.id < contentIndex[myCourse.contentFinished]) {
          content.isWatched = true
        }
        if (content.id > contentIndex[myCourse.contentFinished]) {
          content.isLocked = true
          content.message =
            'Silahkan tonton video sebelumnya, untuk mengakses video selanjutnya'
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
      myCourse.course.coursePrice /
      (1 - myCourse.course.courseDiscountInPercent / 100)

    const contentTotal = myCourse.course.chapters.flatMap((chapter) => {
      return chapter.contents.map((content) => {
        return content.id
      })
    }).length

    const courseProgressInPercentage = Math.round(
      (myCourse.contentFinished / contentTotal) * 100
    )

    res.status(200).json({
      status: 'success',
      course: {
        courseUserId: myCourse.id,
        contentFinished: myCourse.contentFinished,
        contentTotal,
        courseStatus: myCourse.courseStatus,
        ...myCourse.course,
        contentFinished: myCourse.contentFinished,
        courseProgressInPercentage,
        courseStatus: myCourse.courseStatus,
        courseBy: myCourse.course.courseBy.name,
        category: myCourse.course.category.categoryName,
        rawPrice,
        modulePerCourse,
        chapters: resChapter,
        durationPerCourseInMinutes: Math.round(totalCourseDuration),
      },
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const addToCourseUser = async (req, res, next) => {
  try {
    const { courseId } = req.params
    const userId = req.user.id

    const isCourseEnrolled = await CourseUser.findOne({
      where: { courseId, userId },
    })

    const transaction = await Transaction.findOne({
      where: { courseId, userId },
    })

    const course = await Course.findOne({
      where: { id: courseId },
    })

    if (!course) {
      return next(new ApiError('Kursus tidak ditemukan', 404))
    }

    const isPurchased = transaction?.paymentStatus == 'paid' ? true : false
    const isPremium = course.courseType == 'Premium' ? true : false

    if (!isPurchased && isPremium) {
      return next(new ApiError('Silahkan beli kursus terlebih dahulu', 402))
    }

    if (isCourseEnrolled) {
      return next(
        new ApiError(
          'Gagal menambahkan kursus karena kursus sudah ditambahkan di kelas berjalan',
          400
        )
      )
    }
    const newCourseUser = await CourseUser.create({
      courseId: courseId,
      userId: userId,
      courseStatus: 'inProgress',
    })
    const notif = await Notification.create({
      userId: userId,
      courseId: courseId,
      courseUserId: newCourseUser.id,
      titleNotification: 'Kelas',
      typeNotification: 'Notifikasi',
      description: `Selamat Anda telah mendaftar di Kelas ${course.courseName}. Ayo selesaikan segera!`,
    })

    await NotificationRead.create({
      notifId: notif.id,
      userId: userId,
      courseId: courseId,
    })

    res.status(201).json({
      status: 'Success',
      message: 'Berhasil menambahkan ke kelas berjalan, Selamat belajar!',
      newCourseUser,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const updateCourseStatus = async (req, res, next) => {
  const { courseUserId, contentId } = req.params
  try {
    const getCourseUser = await CourseUser.findOne({
      where: {
        id: req.params.courseUserId,
      },
      plain: true,
      include: {
        model: Course,
        as: 'course',
        include: [
          {
            model: Chapter,
            as: 'chapters',
            include: [
              {
                model: Content,
                as: 'contents',
              },
            ],
          },
        ],
      },
    })

    if (!getCourseUser) {
      return next(new ApiError('Kursus berjalan tidak ditemukan', 404))
    }

    const courseUser = getCourseUser.toJSON()

    const transaction = await Transaction.findOne({
      where: { courseId: courseUser.courseId, userId: req.user.id },
    })

    const isPurchased = transaction?.paymentStatus == 'paid' ? true : false
    const isPremium = courseUser.course.courseType == 'Premium' ? true : false

    if (!isPurchased && isPremium) {
      return next(new ApiError('Silahkan beli kursus terlebih dahulu', 402))
    }

    const getContentById = async (contentId) => {
      const contentsIndex = courseUser.course.chapters.flatMap((chapter) => {
        return chapter.contents.map((content) => {
          return content.id
        })
      })

      const isFinished = contentsIndex.findIndex(
        (e) => e === parseInt(contentId)
      )

      let lastContentIndex = courseUser.contentFinished

      if (isFinished === lastContentIndex) {
        const updateLastContentIndex = (lastContentIndex += 1)
        const courseStatus =
          updateLastContentIndex === contentsIndex.length
            ? 'Selesai'
            : 'inProgress'
        await CourseUser.update(
          { contentFinished: updateLastContentIndex, courseStatus },
          { where: { id: courseUserId, userId: req.user.id } }
        )
        return {
          contentFinished: updateLastContentIndex,
        }
      }
      if (isFinished > lastContentIndex) {
        return {
          message: 'Selesaikan video materi sebelumnya, sebelum lanjut!',
          contentFinished: lastContentIndex,
          isError: true,
          statusCode: 400,
        }
      }
      if (isFinished === -1) {
        return {
          message: 'Video ini bukan bagian dari modul ini!',
          contentFinished: lastContentIndex,
          isError: true,
          statusCode: 404,
        }
      }
      if (isFinished < lastContentIndex) {
        return {
          message: 'Video telah ditonton, jadi tidak mengupdate progress',
          contentFinished: lastContentIndex,
          isError: true,
          statusCode: 400,
        }
      }
    }

    const updateProgress = await getContentById(contentId)

    if (updateProgress.isError) {
      return next(
        new ApiError(updateProgress.message, updateProgress.statusCode)
      )
    }

    res.status(200).json({
      status: 'success',
      ...updateProgress,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = {
  getAllMyCourse,
  getOneMyCourse,
  addToCourseUser,
  updateCourseStatus,
}
