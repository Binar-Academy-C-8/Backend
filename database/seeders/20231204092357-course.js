'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const courses = [
      {
        userId: 1,
        courseCode: 'UIUX1',
        courseName: 'Binar Beginner UI/UX',
        courseType: 'free',
        courseLevel: 'beginner',
        aboutCourse: 'Belajar UI/UX dasar',
        intendedFor: 'Untuk seorang pemula yang ingin menjadi Profesional',
        coursePrice: 0,
        categoryId: 1,
        image:
          'https://ik.imagekit.io/xphqqd3ms/UIUX.png?updatedAt=1701519810278',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseCode: 'WD1',
        userId: 1,
        courseName: 'CSS dan HTML dalam seminggu',
        courseType: 'free',
        courseLevel: 'beginner',
        aboutCourse: 'Belajar Frontend Web menggunakan CSS dan HTML',
        intendedFor: 'Untuk seorang pemula yang ingin menjadi Profesional',
        categoryId: 2,
        coursePrice: 0,
        image:
          'https://ik.imagekit.io/xphqqd3ms/webdev.png?updatedAt=1701519810308',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseCode: 'DS1',
        userId: 1,
        courseName: 'Belajar OOP Python',
        courseType: 'free',
        courseLevel: 'intermediate',
        aboutCourse: 'Belajar OOP Python',
        intendedFor:
          'Untuk seorang yang sudah familiat dengan python yang ingin menjadi lebih Profesional',
        coursePrice: 0,
        categoryId: 3,
        image:
          'https://ik.imagekit.io/xphqqd3ms/image(1).png?updatedAt=1701517286117',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseCode: 'AD1',
        userId: 1,
        courseName: 'Belajar Kotlin Lanjutan',
        courseType: 'premium',
        courseLevel: 'advanced',
        aboutCourse: 'Belajar materi kotlin lanjutan',
        intendedFor: 'Android developer Profesional',
        coursePrice: 199000,
        categoryId: 4,
        image:
          'https://ik.imagekit.io/xphqqd3ms/data-science.png?updatedAt=1701519810378',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
    ]

    const chapter = [
      {
        courseId: 1,
        chapterTitle: 'Pendahuluan',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 1,
        chapterTitle: 'Memulai Desain',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 1,
        chapterTitle: 'Belajar Figma',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 2,
        chapterTitle: 'Pendahuluan HTML',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 2,
        chapterTitle: 'Styling HTML dengan CSS',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 3,
        chapterTitle: 'Pengenalan Class',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 3,
        chapterTitle: 'Pengenalan Module',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 4,
        chapterTitle: 'Pengenalan Coroutine',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
    ]

    const content = [
      {
        chapterId: 1,
        contentTitle: 'Tujuan Mengikuti Kelas Design System',
        duration: '1:00',
        status: true,
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 1,
        contentTitle: 'Pengenalan Design Sistem',
        duration: '1:00',
        status: true,
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 2,
        contentTitle: 'Contoh Dalam Membangun Design System',
        duration: '1:00',
        status: true,
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 2,
        contentTitle: 'Color Palette',
        duration: '1:00',
        status: true,
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 3,
        contentTitle: 'Membuat Components',
        duration: '1:00',
        status: true,
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 4,
        contentTitle: 'HTML dasar',
        duration: '1:00',
        status: true,
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 5,
        contentTitle: 'CSS dasar',
        duration: '1:00',
        status: true,
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 6,
        contentTitle: 'Apa itu Class?',
        duration: '1:30',
        status: true,
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 6,
        contentTitle: 'Kelebihan menggunakan Class',
        duration: '1:30',
        status: true,
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 7,
        contentTitle: 'Apa itu module di Python?',
        duration: '1:30',
        status: true,
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 7,
        contentTitle: 'Manfaat module di Python?',
        duration: '1:30',
        status: true,
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 8,
        contentTitle: 'Apa itu Coroutine di Kotlin?',
        duration: '1:59',
        status: true,
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
    ]

    await queryInterface.bulkInsert('Courses', courses)
    await queryInterface.bulkInsert('Chapters', chapter)
    await queryInterface.bulkInsert('Contents', content)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {})
    await queryInterface.bulkDelete('Chapters', null, {})
    await queryInterface.bulkDelete('Contents', null, {})
  },
}
