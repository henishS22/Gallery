const express = require('express');
const router = new express.Router();
const { loggedIn, protect } = require('../middlewares/auth');
// const { uploadToS3 } = require('../services/image-upload-s3');
const { addImage, deleteImage, addToFav ,showAllImg, showFav, removeFromFav} = require('../controllers/mediaController');
// const { deleteFromS3 } = require('../services/image-delete-s3');
const { mediaUpload } = require('../services/image-upload');

router.use(loggedIn, protect);
// router.post('/add-media', loggedIn, protect, uploadToS3('user-media').array('media'), addImage);
router.post('/add-media', mediaUpload('users-media').array('media'), addImage);
router.delete('/delete-image', deleteImage);
router.put('/add-to-fav', addToFav);
router.put('/remove-fav', removeFromFav);
router.get('/all-image', showAllImg);
router.get('/show-fav', showFav);

module.exports = router;
