'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const courses = [
      {
        userId: 1,
        courseCode: 'UIUX1',
        courseName: 'Binar Beginner UI/UX',
        courseType: 'Free',
        telegramGroup: 'https://t.me/+yplueYmNDRZlZDNl',
        courseLevel: 'Beginner',
        aboutCourse:
          'Belajar dasar-dasar desain antarmuka pengguna (UI) dan pengalaman pengguna (UX) dengan kursus "Binar Beginner UI/UX". Kursus ini dirancang khusus untuk pemula yang ingin memahami konsep dasar desain UI/UX dan membangun dasar yang kuat dalam menciptakan pengalaman pengguna yang menarik dan efektif.',
        intendedFor:
          'Mengajarkan dasar-dasar desain antarmuka pengguna (UI) dan pengalaman pengguna (UX) serta konsep-konsep design system. Memberikan keterampilan menggunakan alat desain seperti Figma dan menerapkan prinsip-prinsip desain UI yang efektif. Peserta akan dapat menciptakan pengalaman pengguna yang menarik dan membangun dasar kuat untuk karir di bidang desain UI/UX melalui proyek-proyek praktis.',
        courseDiscountInPercent: 0,
        coursePrice: 0,
        categoryId: 1,
        rating: 4.7,
        image:
          'https://ik.imagekit.io/AliRajab03/IMG-1701735373080._AHX82eu7S.jpeg?updatedAt=1701735376494',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseCode: 'WD1',
        userId: 1,
        courseName: 'CSS dan HTML dalam seminggu',
        courseType: 'Free',
        telegramGroup: 'https://t.me/+yplueYmNDRZlZDNl',
        courseLevel: 'Beginner',
        aboutCourse:
          'Kursus "CSS dan HTML dalam Seminggu" adalah perjalanan intensif yang membawa Anda melalui dasar-dasar HTML dan CSS dalam waktu singkat. Melalui serangkaian modul yang terstruktur, Anda akan memahami struktur dan styling dasar halaman web. Kursus ini dirancang untuk pemula yang ingin mempercepat pemahaman mereka tentang HTML untuk struktur konten dan CSS untuk desain. Dengan fokus pada proyek-praktis, Anda akan langsung mengaplikasikan pengetahuan Anda dan membangun kepercayaan untuk membuat halaman web sederhana.',
        intendedFor:
          'Kelas "CSS dan HTML dalam Seminggu" bertujuan memberikan pemahaman yang cepat dan kuat tentang dasar-dasar HTML dan CSS. Melalui pendekatan intensif, Anda akan menguasai struktur dan styling dasar untuk membuat halaman web sederhana. Dengan fokus pada penerapan langsung melalui proyek-praktis, kursus ini dirancang untuk mempercepat kepercayaan diri Anda dalam menggunakan HTML untuk struktur dan CSS untuk desain. Tujuan utamanya adalah memberikan fondasi yang kokoh, memungkinkan Anda membuat dan mengelola halaman web dengan efektif dalam waktu singkat.',
        categoryId: 2,
        courseDiscountInPercent: 0,
        coursePrice: 0,
        rating: 4.9,
        image:
          'https://ik.imagekit.io/AliRajab03/IMG-1701735496898._zmBLMJx9E.jpeg?updatedAt=1701735500597',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseCode: 'DS1',
        userId: 1,
        courseName: 'Belajar OOP Python',
        courseType: 'Free',
        telegramGroup: 'https://t.me/+yplueYmNDRZlZDNl',
        courseLevel: 'Intermediate',
        aboutCourse:
          'Kelas "Belajar OOP Python merupakan panduan intensif yang mengajak peserta memahami dan menguasai Pemrograman Berorientasi Objek (OOP) menggunakan bahasa pemrograman Python. Melalui materi yang disajikan secara sistematis, peserta akan diperkenalkan pada konsep dasar OOP, seperti kelas, objek, enkapsulasi, pewarisan, dan polimorfisme. Setiap topik disajikan dengan contoh praktis untuk memastikan pemahaman yang mendalam. Dengan kombinasi teori dan praktikum, kelas ini menjadi langkah awal yang ideal bagi siapa saja yang ingin menguasai OOP menggunakan Python.',
        intendedFor:
          'Untuk seorang yang sudah familiar dengan python yang ingin menjadi lebih Profesional',
        courseDiscountInPercent: 0,
        coursePrice: 0,
        categoryId: 3,
        rating: 4.3,
        image:
          'https://ik.imagekit.io/AliRajab03/IMG-1701735530599._SaDVh2c2g.jpeg?updatedAt=1701735533852',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseCode: 'AD1',
        userId: 1,
        courseName: 'Belajar Kotlin Lanjutan',
        courseType: 'Premium',
        telegramGroup: 'https://t.me/+yplueYmNDRZlZDNl',
        courseLevel: 'Advanced',
        aboutCourse:
          'Belajar Kotlin Lanjutan adalah kelas yang dirancang khusus bagi mereka yang telah memiliki pemahaman dasar tentang bahasa pemrograman Kotlin dan ingin mengambil langkah lebih jauh. Dalam kelas ini, peserta akan dihadapkan pada konsep-konsep tingkat lanjut seperti generic, extension functions, coroutines, dan fitur-fitur canggih lainnya yang membuat Kotlin menjadi bahasa yang powerful dan ekspresif.',
        intendedFor: 'Android developer Profesional',
        courseDiscountInPercent: 0,
        coursePrice: 199000,
        categoryId: 4,
        rating: 4.2,
        image:
          'https://ik.imagekit.io/AliRajab03/IMG-1701735564320._8NY5we_7t.jpeg?updatedAt=1701735567581',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseCode: 'PM1',
        userId: 1,
        courseName: 'Mastery Product Management',
        courseType: 'Premium',
        telegramGroup: 'https://t.me/+yplueYmNDRZlZDNl',
        courseLevel: 'Advanced',
        aboutCourse:
          'Mastery Product Management adalah kursus khusus yang dirancang bagi mereka yang sudah memiliki pemahaman dasar tentang manajemen produk dan ingin meningkatkan keterampilan mereka. Dalam kursus ini, peserta akan mendalami konsep-konsep tingkat lanjut seperti analisis pasar, perencanaan strategis, dan pengembangan produk yang adaptif. Kurikulum mencakup studi komprehensif tentang manajemen siklus hidup produk dan pertimbangan etika dalam ranah manajemen produk.',
        intendedFor: 'Dirancang khusus untuk manajer produk berpengalaman',
        courseDiscountInPercent: 20,
        coursePrice: 200000,
        categoryId: 5,
        rating: 4.1,
        image:
          'https://ik.imagekit.io/AliRajab03/IMG-1701735786642._-fTpdTNwR.jpeg?updatedAt=1701735789863',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseCode: 'ID1',
        userId: 1,
        courseName: 'Intermediate iOS Development',
        courseType: 'Premium',
        telegramGroup: 'https://t.me/+yplueYmNDRZlZDNl',
        courseLevel: 'Intermediate',
        aboutCourse:
          'Intermediate iOS Development adalah kursus yang cocok untuk pengembang iOS dengan pemahaman dasar dan ingin meningkatkan keterampilan mereka ke tingkat yang lebih tinggi. Dalam kursus ini, peserta akan menjelajahi konsep-konsep menengah dalam pengembangan aplikasi iOS, termasuk pengelolaan data, UI/UX design, dan pengoptimalan kinerja aplikasi.',
        intendedFor: 'Pengembang iOS',
        courseDiscountInPercent: 20,
        coursePrice: 200000,
        categoryId: 6,
        rating: 4.6,
        image:
          'https://ik.imagekit.io/AliRajab03/IMG-1701735786642._-fTpdTNwR.jpeg?updatedAt=1701735789863',
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
        chapterTitle: 'Pengenalan UI/UX',
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
        courseId: 2,
        chapterTitle: 'Media Queries dan Responsif Design',
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
        courseId: 3,
        chapterTitle: 'Statistik Dasar menggunakan Python',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 4,
        chapterTitle: 'Mengenal Coroutine Scope',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 4,
        chapterTitle: 'Suspend Functions',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 4,
        chapterTitle: 'Async-Await Pattern',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 5,
        chapterTitle: 'Apa itu Manajemen Produk?',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 5,
        chapterTitle: 'Proses Pengembangan Produk',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 5,
        chapterTitle: 'Strategi Produk yang Sukses',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 5,
        chapterTitle: 'Metrik Produk yang Penting',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 6,
        chapterTitle: 'Struktur Projek iOS',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 6,
        chapterTitle: 'Networking dan Pengolahan Data',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 6,
        chapterTitle: 'User Interface Intermediate',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        courseId: 6,
        chapterTitle: 'Interaksi dengan Perangkat Keras',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
    ]

    const content = [
      {
        chapterId: 1,
        contentTitle: 'Definisi UI (User Interface) dan UX (User Experience)',
        duration: '1:00',
        youtubeId: 'ixOd42SEUF0',
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 1,
        contentTitle: 'Ruang Lingkup UI/UX Design',
        duration: '1:00',
        youtubeId: 'DwTkyMJi890',
        contentUrl: 'https://youtu.be/DwTkyMJi890',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 1,
        contentTitle: 'Alat Desain UI/UX',
        duration: '1:00',
        youtubeId: 'rd-590n3H6w',
        contentUrl: 'https://youtu.be/rd-590n3H6w',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 2,
        contentTitle: 'Studi Kasus',
        duration: '1:00',
        youtubeId: 'HYfG_uCOlhc',
        contentUrl: 'https://youtu.be/HYfG_uCOlhc',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 2,
        contentTitle: 'Tren Desain Terkini',
        duration: '1:00',
        youtubeId: 'DmxXl1k0X5g',
        contentUrl: 'https://youtu.be/DmxXl1k0X5g',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 2,
        contentTitle: 'Keterkaitan dengan Pengembangan Produk',
        duration: '1:00',
        youtubeId: '1eJzLj9OE0Q',
        contentUrl: 'https://youtu.be/1eJzLj9OE0Q',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 2,
        contentTitle: 'Latihan Praktis',
        duration: '1:00',
        youtubeId: '6hIUgd6WuFw',
        contentUrl: 'https://youtu.be/6hIUgd6WuFw',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 3,
        contentTitle: 'Prinsip-prinsip Desain UI/UX',
        duration: '1:00',
        youtubeId: '6hXoBeIQd-o',
        contentUrl: 'https://youtu.be/6hXoBeIQd-o',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 3,
        contentTitle: 'Proses Desain',
        duration: '1:00',
        youtubeId: 'yk_p1bi6Oyw',
        contentUrl: 'https://youtu.be/yk_p1bi6Oyw',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 3,
        contentTitle: 'Menggunakan Alat Desain seperti Figma',
        duration: '1:00',
        youtubeId: 'HVmmrTBdiFY',
        contentUrl: 'https://youtu.be/HVmmrTBdiFY',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 3,
        contentTitle: 'Penerapan Prinsip-prinsip Desain UI',
        duration: '1:00',
        youtubeId: 'eSrXU5vrgaI',
        contentUrl: 'https://youtu.be/eSrXU5vrgaI',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 4,
        contentTitle: 'Pengenalan Figma',
        duration: '1:00',
        youtubeId: 'JVJc4k6xjTM',
        contentUrl: 'https://youtu.be/JVJc4k6xjTM',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 4,
        contentTitle: 'Membuat Proyek Baru',
        duration: '1:00',
        youtubeId: 'Sl0YBFJuvSU',
        contentUrl: 'https://youtu.be/Sl0YBFJuvSU',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 4,
        contentTitle: 'Komponen dan Variasi',
        duration: '1:00',
        youtubeId: 't2s863UWF2I',
        contentUrl: 'https://youtu.be/t2s863UWF2I',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 4,
        contentTitle: 'Prototyping',
        duration: '1:00',
        youtubeId: 'yk_p1bi6Oyw',
        contentUrl: 'https://youtu.be/yk_p1bi6Oyw',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 5,
        contentTitle: 'Pengenalan HTML',
        duration: '1:00',
        youtubeId: 'ixOd42SEUF0',
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 5,
        contentTitle: 'Struktur Dasar HTML',
        duration: '1:00',
        youtubeId: 'DwTkyMJi890',
        contentUrl: 'https://youtu.be/DwTkyMJi890',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 5,
        contentTitle: 'Elemen dan Atribut HTML',
        duration: '1:00',
        youtubeId: 'rd-590n3H6w',
        contentUrl: 'https://youtu.be/rd-590n3H6w',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 5,
        contentTitle: 'Hyperlinks dan Anchor Tags',
        duration: '1:00',
        youtubeId: 'HYfG_uCOlhc',
        contentUrl: 'https://youtu.be/HYfG_uCOlhc',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 6,
        contentTitle: 'Pengenalan CSS',
        duration: '1:30',
        youtubeId: 'DmxXl1k0X5g',
        contentUrl: 'https://youtu.be/DmxXl1k0X5g',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 6,
        contentTitle: 'Styling Dasar',
        duration: '1:30',
        youtubeId: '1eJzLj9OE0Q',
        contentUrl: 'https://youtu.be/1eJzLj9OE0Q',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 6,
        contentTitle: 'Box Model',
        duration: '1:30',
        youtubeId: '6hIUgd6WuFw',
        contentUrl: 'https://youtu.be/6hIUgd6WuFw',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 7,
        contentTitle: 'Pengenalan Responsif Design',
        duration: '1:30',
        youtubeId: '6hXoBeIQd-o',
        contentUrl: 'https://youtu.be/6hXoBeIQd-o',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 7,
        contentTitle: 'Media Queries',
        duration: '1:30',
        youtubeId: 'HVmmrTBdiFY',
        contentUrl: 'https://youtu.be/HVmmrTBdiFY',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 8,
        contentTitle: 'Konsep Dasar OOP',
        duration: '1:59',
        youtubeId: 'ixOd42SEUF0',
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 8,
        contentTitle: 'Kelas dan Objek',
        duration: '1:59',
        youtubeId: 'DwTkyMJi890',
        contentUrl: 'https://youtu.be/DwTkyMJi890',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 8,
        contentTitle: 'Atribut dan Metode',
        duration: '1:59',
        youtubeId: 'rd-590n3H6w',
        contentUrl: 'https://youtu.be/rd-590n3H6w',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 9,
        contentTitle: 'Pengertian Module',
        duration: '1:59',
        youtubeId: 'HYfG_uCOlhc',
        contentUrl: 'https://youtu.be/HYfG_uCOlhc',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 9,
        contentTitle: 'Menggunakan Module',
        duration: '1:59',
        youtubeId: 'DmxXl1k0X5g',
        contentUrl: 'https://youtu.be/DmxXl1k0X5g',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 9,
        contentTitle: 'Membuat Module Sendiri',
        duration: '1:59',
        youtubeId: '1eJzLj9OE0Q',
        contentUrl: 'https://youtu.be/1eJzLj9OE0Q',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 10,
        contentTitle: 'Pendahuluan Statistik',
        duration: '1:59',
        youtubeId: '6hIUgd6WuFw',
        contentUrl: 'https://youtu.be/6hIUgd6WuFw',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 10,
        contentTitle: 'Deskriptif Statistik',
        duration: '1:59',
        youtubeId: '6hXoBeIQd-o',
        contentUrl: 'https://youtu.be/6hXoBeIQd-o',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 10,
        contentTitle: 'Probabilitas',
        duration: '1:59',
        youtubeId: 'HVmmrTBdiFY',
        contentUrl: 'https://youtu.be/HVmmrTBdiFY',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 11,
        contentTitle: 'Pendahuluan Coroutine',
        duration: '1:59',
        youtubeId: 'ixOd42SEUF0',
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 11,
        contentTitle: 'Coroutine Scope',
        duration: '1:59',
        youtubeId: 'DwTkyMJi890',
        contentUrl: 'https://youtu.be/DwTkyMJi890',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 11,
        contentTitle: 'Penggunaan Coroutine dalam Pengembangan Android',
        duration: '1:59',
        youtubeId: 'rd-590n3H6w',
        contentUrl: 'https://youtu.be/rd-590n3H6w',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 12,
        contentTitle: 'Pengenalan Fungsi Suspend',
        duration: '1:59',
        youtubeId: 'HYfG_uCOlhc',
        contentUrl: 'https://youtu.be/HYfG_uCOlhc',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 12,
        contentTitle:
          'Penggunaan Fungsi Suspend dalam Asynchronous Programming',
        duration: '1:59',
        youtubeId: 'DmxXl1k0X5g',
        contentUrl: 'https://youtu.be/DmxXl1k0X5g',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 12,
        contentTitle: 'Penggunaan Suspend Functions dalam Aplikasi Android',
        duration: '1:59',
        youtubeId: '1eJzLj9OE0Q',
        contentUrl: 'https://youtu.be/1eJzLj9OE0Q',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 13,
        contentTitle: 'Pengantar Async-Await',
        duration: '1:59',
        youtubeId: '6hIUgd6WuFw',
        contentUrl: 'https://youtu.be/6hIUgd6WuFw',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 13,
        contentTitle: 'Async-Await Syntax',
        duration: '1:59',
        youtubeId: '6hXoBeIQd-o',
        contentUrl: 'https://youtu.be/6hXoBeIQd-o',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 13,
        contentTitle: 'Manajemen Concurrent Tasks',
        duration: '1:59',
        youtubeId: 'HVmmrTBdiFY',
        contentUrl: 'https://youtu.be/HVmmrTBdiFY',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 14,
        contentTitle: 'Definisi Manajemen Produk',
        duration: '1:59',
        youtubeId: 'ixOd42SEUF0',
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 14,
        contentTitle: 'Siklus Hidup Produk',
        duration: '1:59',
        youtubeId: 'DwTkyMJi890',
        contentUrl: 'https://youtu.be/DwTkyMJi890',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 14,
        contentTitle: 'Proses Pengembangan Produk',
        duration: '1:59',
        youtubeId: 'rd-590n3H6w',
        contentUrl: 'https://youtu.be/rd-590n3H6w',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 15,
        contentTitle: 'Analisis Kebutuhan Pengguna',
        duration: '1:59',
        youtubeId: 'HYfG_uCOlhc',
        contentUrl: 'https://youtu.be/HYfG_uCOlhc',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 15,
        contentTitle: 'Perencanaan Strategis',
        duration: '1:59',
        youtubeId: 'DmxXl1k0X5g',
        contentUrl: 'https://youtu.be/DmxXl1k0X5g',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 15,
        contentTitle: 'Cicilan Produk (Product Iterations)',
        duration: '1:59',
        youtubeId: '1eJzLj9OE0Q',
        contentUrl: 'https://youtu.be/1eJzLj9OE0Q',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 16,
        contentTitle: 'Analisis Pasar Produk',
        duration: '1:59',
        youtubeId: '6hIUgd6WuFw',
        contentUrl: 'https://youtu.be/6hIUgd6WuFw',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 16,
        contentTitle: 'Perencanaan Strategis',
        duration: '1:59',
        youtubeId: '6hXoBeIQd-o',
        contentUrl: 'https://youtu.be/6hXoBeIQd-o',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 16,
        contentTitle: 'Pengembangan Produk yang Adaptif',
        duration: '1:59',
        youtubeId: 'HVmmrTBdiFY',
        contentUrl: 'https://youtu.be/HVmmrTBdiFY',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 17,
        contentTitle: 'Pengenalan Metrik Produk',
        duration: '1:59',
        youtubeId: 'eSrXU5vrgaI',
        contentUrl: 'https://youtu.be/eSrXU5vrgaI',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 17,
        contentTitle: 'Kategori Metrik Produk',
        duration: '1:59',
        youtubeId: 'JVJc4k6xjTM',
        contentUrl: 'https://youtu.be/JVJc4k6xjTM',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 17,
        contentTitle: 'Pemilihan Metrik yang Tepat',
        duration: '1:59',
        youtubeId: 'Sl0YBFJuvSU',
        contentUrl: 'https://youtu.be/Sl0YBFJuvSU',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 18,
        contentTitle: 'Struktur Dasar Projek iOS',
        duration: '1:59',
        youtubeId: 'ixOd42SEUF0',
        contentUrl: 'https://youtu.be/ixOd42SEUF0',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 18,
        contentTitle: 'Pengelolaan File dan Direktori',
        duration: '1:59',
        youtubeId: 'DwTkyMJi890',
        contentUrl: 'https://youtu.be/DwTkyMJi890',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 18,
        contentTitle: 'Cara Menggunakan Storyboard',
        duration: '1:59',
        youtubeId: 'rd-590n3H6w',
        contentUrl: 'https://youtu.be/rd-590n3H6w',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 19,
        contentTitle: 'Networking in iOS',
        duration: '1:59',
        youtubeId: 'HYfG_uCOlhc',
        contentUrl: 'https://youtu.be/HYfG_uCOlhc',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 19,
        contentTitle: 'Pengolahan Data',
        duration: '1:59',
        youtubeId: 'DmxXl1k0X5g',
        contentUrl: 'https://youtu.be/DmxXl1k0X5g',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 19,
        contentTitle: 'Manajemen Keadaan Aplikasi',
        duration: '1:59',
        youtubeId: '1eJzLj9OE0Q',
        contentUrl: 'https://youtu.be/1eJzLj9OE0Q',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 20,
        contentTitle: 'Pengelolaan Tampilan',
        duration: '1:59',
        youtubeId: '6hIUgd6WuFw',
        contentUrl: 'https://youtu.be/6hIUgd6WuFw',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 20,
        contentTitle: 'Animasi dan Transisi',
        duration: '1:59',
        youtubeId: 'eSrXU5vrgaI',
        contentUrl: 'https://youtu.be/eSrXU5vrgaI',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 20,
        contentTitle: 'Gestur dan Interaksi Pengguna',
        duration: '1:59',
        youtubeId: 'HVmmrTBdiFY',
        contentUrl: 'https://youtu.be/HVmmrTBdiFY',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 21,
        contentTitle: 'Pengenalan Perangkat Keras iOS',
        duration: '1:59',
        youtubeId: 'eSrXU5vrgaI',
        contentUrl: 'https://youtu.be/eSrXU5vrgaI',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 21,
        contentTitle: 'Menggunakan Sensor',
        duration: '1:59',
        youtubeId: 'JVJc4k6xjTM',
        contentUrl: 'https://youtu.be/JVJc4k6xjTM',
        updatedAt: '2023-11-28T06:25:24.446Z',
        createdAt: '2023-11-28T06:25:24.446Z',
      },
      {
        chapterId: 21,
        contentTitle: 'Integrasi Kamera dan Mikrofon',
        duration: '1:59',
        youtubeId: 'Sl0YBFJuvSU',
        contentUrl: 'https://youtu.be/Sl0YBFJuvSU',
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
