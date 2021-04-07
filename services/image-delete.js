const fs = require('fs');

exports.deleteMedia = async (folderName, fileName) => {
    const DIR = 'D:/SoluLab/NodeJS/Gallery App/public/henish-gallery/' + folderName;
    fs.unlinkSync(DIR + '/' + fileName);
}