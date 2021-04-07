// const { deleteFromS3 } = require('../services/image-delete-s3');
// const { uploadToS3 } = require('../services/image-upload-s3');
const { deleteMedia } = require('../services/image-delete');
const { handleError, handleResponse } = require('../utils/requestHandlers');

exports.updateDp = async (req, res, next) => {
    try {
        // if (req.user.dp) {
        // const del = await deleteFromS3('users-dp', req.user.dp);
        if (req.file) {
            if (req.user.dp) {
                await deleteMedia('users-dp', req.user.dp);
                next();
            } else {
                next();
            }
        } else {
            next();
        }
    } catch (e) {
        handleError({ res, data: e });
    }
}

exports.checkDp = async (req, res, next) => {
    try {
        // if (req.user.dp) {
        // const del = await deleteFromS3('users-dp', req.user.dp);
        if (req.user.dp) {
            await deleteMedia('users-dp', req.user.dp);
            next();
        } else {
            handleResponse({ res, data: 'No Dp set for this profile' });
            next();
        }
    } catch (e) {
        handleError({ res, e });
    }
}
