const Media = require('../models/media');

exports.addMedia = (media) => {
    return Media.create(media);
}

exports.findMedia = (id) => {
    return Media.findById(id);
}

exports.findUserMedia = (id) => {
    return Media.find({ user: id });
}

exports.findUserMediaByType = (id, type) => {
    return Media.find({ user: id, mediaType: type });
}

exports.deleteUserMedia = (id) => {
    return Media.findOneAndDelete({ _id : id });
}

exports.updateMedia = (id, data) => {
    return Media.findOneAndUpdate({ _id: id }, data, {
        new:true
    });
}

exports.favMedia = (id, data) => {
    return Media.find({ user: id, isFavourite: data });
}