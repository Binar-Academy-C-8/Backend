const chapters = [
  {
    id: 1,
    title: 'chap 1',
    contents: [
      {
        id: 10,
        chapterId: 1,
        title: 'content 1',
        video: 'app.mp4',
      },
      {
        id: 12,
        chapterId: 1,
        title: 'content 2',
        video: 'app.mp4',
      },
    ],
  },
  {
    id: 4,
    title: 'chap 2',
    contents: [
      {
        id: 14,
        chapterId: 4,
        title: 'content 3',
        video: 'app.mp4',
      },
      {
        id: 16,
        chapterId: 4,
        title: 'content 4',
        video: 'app.mp4',
      },
      {
        id: 18,
        chapterId: 4,
        title: 'content 5',
        video: 'app.mp4',
      },
    ],
  },
]

let courseFinished = 0

function getChapter(lastContentId) {
  return chapters.map((chapter) => {
    return chapter.contents.map((content) => {
      if (content.id > lastContentId) {
        delete content.video
        content.message = 'selesaikan video pembelajaran sebelumnya :)'
      }
      return content
    })
  })
}

function getChapterIdByContentId(contentId) {
  const contentIndex = chapters.flatMap((chapter) => {
    return chapter.contents.map((content) => {
      return content.id
    })
  })
  console.log(contentIndex)
  const isFinished = contentIndex.findIndex((index) => index === contentId)

  if (isFinished === courseFinished) {
    courseFinished += 1
    const lastContentId = contentIndex.findIndex(
      (index) => index === courseFinished
    )
    const progress = (courseFinished / contentIndex.length) * 100 + '%'
    return {
      courseFinished,
      lastContentId,
      lastContentId: contentId,
      progress,
    }
  }
  if (isFinished === -1) {
    const lastContentId = contentIndex.findIndex(
      (index) => index === courseFinished
    )
    return {
      message: 'content tidak ditemukan di course ini',
      courseFinished,
      lastContentId,
    }
  }
  if (isFinished > courseFinished) {
    return {
      message: 'Selesaikan course sebelumnya!',
      courseFinished,
      lastContentId: -1,
    }
  }
}

getChapterIdByContentId(10)
// getChapterIdByContentId(12)
// getChapterIdByContentId(14)
// getChapterIdByContentId(100)
// const lastContentId = getChapterIdByContentId(100).lastContentId
// console.info(getChapter(lastContentId))
