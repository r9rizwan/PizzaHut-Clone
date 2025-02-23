const multer = require("multer"); // Import Multer
const path = require("path");

const getMulterDiskStorageUploads = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads")); // Directory to store the files
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });

  return multer({ storage: storage });
};

module.exports = { getMulterDiskStorageUploads };
