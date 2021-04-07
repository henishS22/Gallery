const multer = require('multer');
const path = require('path');

exports.mediaUpload = (folderName) => {
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `public/henish-gallery/${folderName}`);
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })
    const upload = multer({ storage: storage });
    return upload;
}