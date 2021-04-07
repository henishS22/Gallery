// const { deleteFromS3 } = require('../services/image-delete-s3');
const { addMedia, findMedia, deleteUserMedia, updateMedia, findUserMedia, favMedia } = require('../db-services/media-services');
const { deleteMedia } = require('../services/image-delete');
const { handleResponse, handleError } = require('../utils/requestHandlers');

exports.addImage = async (req, res, next) => {
    try {
        if (req.files) {
            const media = [];
            if (req.query.type == 'img') {
                req.body.mediaType = 'img'
            } else if (req.query.type == 'video') {
                req.body.mediaType = 'video'
            }
            for (let i = 0; i < req.files.length; i++) {
                req.body.url = req.files[i].filename;
                req.body.user = req.user._id;
                media.push(await addMedia(req.body));
            }
            handleResponse({ res, data: media });
        } else {
            handleResponse({ res, data: 'Please select File to Upload' });
        }
    } catch (e) {
        handleError({ res, data:e });
    }
}

exports.deleteImage = async (req, res, next) => {
    try {

        const data = await findMedia(req.query.id);
        if (!data) {
            handleResponse({ res, data: data });
        }
        await deleteMedia('users-media', data.url);
        const imgDelete = await deleteUserMedia(data._id);
        handleResponse({ res, data: imgDelete });
    } catch (e) {
        handleError({ res, e });
    }
}

exports.addToFav = async (req, res, next) => {
    try {
        const data = await findMedia(req.body.id);
        if (!data) {
            handleResponse({ res, data: 'No media Found' });
        }
        const fav = await updateMedia(data._id, { isFavourite: 'true' });
        if (fav) {
            handleResponse({ res, data: fav });
        }
    } catch (e) {
        handleError({ res, e });
    }
}

exports.removeFromFav = async (req, res, next) => {
    try {
        const data = await findMedia(req.body.id);
        if (!data) {
            handleResponse({ res, data: data });
        }
        const fav = await updateMedia(data._id , { isFavourite: 'false' });
        if (fav) {
            handleResponse({ res, data: fav });
        }
    } catch (e) {
        handleError({ res, e });
    }
}

exports.showAllImg = async (req, res, next) => {
    try {
        const data = await findUserMedia(req.user._id);
        handleResponse({ res, data: data });
    } catch (e) {
        handleError({ res, e });
    }
}

exports.showFav = async (req, res, next) => {
    try {
        const data = await favMedia(req.user._id, 'true');
        handleResponse({ res, data });
    } catch (e) {
        handleError({ res, e });
    }
}

