const multer = require("multer");
const { RESPONSE_CODE } = require("../constants");
const { getTimeStampMiliSecond } = require("../utils/date");

const upLoadAvatarMiddleware = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images");
    },

    //check extension of file images
    filename: (req, file, cb) => {
      const match = ["image/png", "image/jpeg", "image/jpg"];

      if (match.indexOf(file.mimetype) === -1) {
        var message = `${file.originalname} is invalid. Only accept png/jpg/jpeg.`;
        return cb(message, null);
      }

      cb(null, `${getTimeStampMiliSecond()}_${file.originalname}`);
    },
  });

  const limits = {
    fileSize: 2 * 1024 * 1024, //Maximum file size is 2MB
  };
  const upload = multer({ limits, storage }).single("imageUrl");

  //handle error multer
  upload(req, res, (err) => {
    if (!req.file) {
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send(`You must select at least 1 file.`);
    }

    if (err instanceof multer.MulterError) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(err.message);
    } else if (err) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(err.message);
    }

    next();
  });
};

module.exports = {
  upLoadAvatarMiddleware,
};
