const { Content } = require('../models');
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
    const { id } = req.params;
    const dataContent = await Content.findOne({
      where: {
        id: id,
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
    const { contentTitle, contentUrl, status } = req.body;
    const { id } = req.params;
    const dataContent = await Content.create({
      contentTitle: contentTitle,
      contentUrl: contentUrl,
      status: status,
      chapterId: id,
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
    const { status } = req.body;
    const { id } = req.params;
    const videoBuffer = req.file.buffer;
    const video = req.file;

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
    const videoTitle = split[0];
    const extension = split[split.length - 1];

    const resizeVideo = compressVideo(video, 14155776);

    const uploadVideo = await imagekit.upload({
      file: resizeVideo.buffer,
      fileName: `${Date.now()}-${videoTitle}.${extension}`,
    });

    const dataContent = await Content.create({
      status: status,
      chapterId: id,
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

module.exports = {
  getContent,
  getContentByid,
  insertContentByLink,
  insertContentByFile,
};
