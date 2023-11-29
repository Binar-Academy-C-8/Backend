const { Content, Chapter } = require('../models');
const ApiError = require('../../utils/apiError');
const compressVideo = require('../../helper/compressVideo');
const imagekit = require('../../lib/imagekit');

// Menampilkan semua data konten course
const getContent = async (req, res, next) => {
  try {
    const dataContent = await Content.findAll();
    console.log(dataContent);

    if (dataContent.length < 1) {
      return next(new ApiError('Data content is empty', 404));
    }

    res.status(200).json({
      status: 'Success',
      data: {
        dataContent,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

// Menampilkan data konten berdasarkan id
const getContentByid = async (req, res, next) => {
  try {
    const { contentId } = req.params;
    const dataContent = await Content.findOne({
      where: {
        id: contentId,
      },
    });

    if (dataContent === null) {
      return next(new ApiError(`Data with id: ${id} content is empty`, 404));
    }

    res.status(200).json({
      status: 'Success',
      data: {
        dataContent,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const insertContentByLink = async (req, res, next) => {
  try {
    const { contentTitle, contentUrl, status, videoDuration } = req.body;
    const { chapterId } = req.params;

    const dataContent = await Content.create({
      chapterId: chapterId,
      contentTitle: contentTitle,
      contentUrl: contentUrl,
      status: status,
      duration: videoDuration,
    });

    res.status(200).json({
      status: 'Success',
      data: {
        dataContent,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const insertContentByFile = async (req, res, next) => {
  try {
    const { status, contentTitle } = req.body;
    const { chapterId } = req.params;
    const videoBuffer = req.file.buffer;
    const video = req.file;
    console.log(contentTitle);

    const timeScale = videoBuffer.readUInt32BE(
      videoBuffer.indexOf(Buffer.from('mvhd')) + 16
    );
    const duration = videoBuffer.readUInt32BE(
      videoBuffer.indexOf(Buffer.from('mvhd')) + 16 + 4
    );
    const seconds = Math.floor(duration / timeScale);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);

    const videoDuration = `${minutes}:${remainingSeconds}`;

    const split = video.originalname.split('.');

    let videoTitle;
    if (!contentTitle) {
      videoTitle = split[0];
    } else {
      videoTitle = contentTitle;
    }

    const resizeVideo = compressVideo(video, 14155776);

    const uploadVideo = await imagekit.upload({
      file: resizeVideo.buffer,
      fileName: videoTitle,
    });

    const dataContent = await Content.create({
      status: status,
      chapterId: chapterId,
      contentTitle: videoTitle,
      contentUrl: uploadVideo.url,
      duration: videoDuration,
    });

    res.status(200).json({
      status: 'Success',
      data: {
        dataContent,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateContentByFile = async (req, res, next) => {
  try {
    const { chapterId, contentId } = req.params;
    const video = req.file;
    const { contentTitle } = req.body;

    const chapterData = await Chapter.findOne({
      where: {
        id: chapterId,
      },
    });

    const contentData = await Content.findOne({
      where: {
        id: contentId,
      },
    });

    // if (chapterData === null) {
    //   return next(new ApiError('Chapter data is not found!', 400));
    // }
    if (contentData === null) {
      return next(new ApiError('content data is not found!', 400));
    }

    if (contentData.dataValues.contentUrl.split('/')[2] === 'ik.imagekit.io') {
      let updateContent;
      if (video) {
        const resizeVideo = compressVideo(video, 14155776);
        const split = video.originalname.split('.');
        const videoTitle = split[0];
        const uploadVideo = await imagekit.upload({
          file: resizeVideo.buffer,
          fileName: videoTitle,
        });
        updateContent = await Content.update(
          {
            contentTitle: contentTitle,
            contentUrl: uploadVideo.url,
          },
          {
            where: {
              chapterId: chapterId,
              id: contentId,
            },
            returning: true,
          }
        );
      } else if (contentTitle) {
        const urlParts = contentData.dataValues.contentUrl.split('/');
        const getName = urlParts[urlParts.length - 1].split(' ').join('_');
        urlParts[urlParts.length - 1] = contentTitle.split(' ').join('_');
        const updateVideoUrl = urlParts.join('/');
        await imagekit.renameFile({
          filePath: getName,
          newFileName: contentTitle,
          purgeCache: false,
        });
        updateContent = await Content.update(
          {
            contentTitle: contentTitle,
            contentUrl: updateVideoUrl,
          },
          {
            where: {
              chapterId: chapterId,
              id: contentId,
            },
            returning: true,
          }
        );
      } else if (contentTitle && video) {
        const resizeVideo = compressVideo(video, 14155776);
        const split = video.originalname.split('.');
        const videoTitle = split[0];
        const uploadVideo = await imagekit.upload({
          file: resizeVideo.buffer,
          fileName: videoTitle,
        });
        await Content.update(
          {
            contentTitle: contentTitle,
            contentUrl: uploadVideo.url,
          },
          {
            where: {
              chapterId: chapterId,
              id: contentId,
            },
            returning: true,
          }
        );
        const urlParts = contentData.dataValues.contentUrl.split('/');
        const getName = urlParts[urlParts.length - 1].split(' ').join('_');
        urlParts[urlParts.length - 1] = contentTitle.split(' ').join('_');
        const updateVideoUrl = urlParts.join('/');
        await imagekit.renameFile({
          filePath: getName,
          newFileName: contentTitle,
          purgeCache: false,
        });
        updateContent = await Content.update(
          {
            contentTitle: contentTitle,
            contentUrl: updateVideoUrl,
          },
          {
            where: {
              chapterId: chapterId,
              id: contentId,
            },
            returning: true,
          }
        );
      }

      res.status(200).json({
        status: 'success',
        data: {
          updateContent: {
            updateContent,
          },
        },
      });
    } else {
      return next(
        new ApiError(`Video with id: ${contentId} not a Imagekit link`, 400)
      );
    }
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateContentByLink = async (req, res, next) => {
  try {
    const { chapterId, contentId } = req.params;
    const { contentTitle, contentUrl, videoDuration } = req.body;

    const chapterData = await Chapter.findOne({
      where: {
        id: chapterId,
      },
    });

    const contentData = await Content.findOne({
      where: {
        id: contentId,
      },
    });

    // if (chapterData === null) {
    //   return next(new ApiError('Chapter data is not found!', 400));
    // }
    if (contentData === null) {
      return next(new ApiError('content data is not found!', 400));
    }

    if (contentData.dataValues.contentUrl.split('/')[2] === 'youtu.be') {
      const updateContent = await Content.update(
        {
          contentTitle: contentTitle,
          contentUrl: contentUrl,
          duration: videoDuration,
        },
        {
          where: {
            chapterId: chapterId,
            id: contentId,
          },
          returning: true,
        }
      );

      res.status(200).json({
        status: 'success',
        data: {
          updateContent: {
            updateContent,
          },
        },
      });
    } else {
      return next(
        new ApiError(`Video with id: ${contentId} not a YouTube link`, 400)
      );
    }
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  getContent,
  getContentByid,
  insertContentByLink,
  insertContentByFile,
  updateContentByFile,
  updateContentByLink,
};
