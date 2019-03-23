var multer = require('multer');

let fileName;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.FILE_PATH)
    },
    filename: function (req, file, cb) {
        fileExtension = file.originalname.split('.')[1] // get file extension from original file name
        fileName = "file-" + Date.now() + "." + fileExtension;
        cb(null, fileName)
    }
});

module.exports = storage;