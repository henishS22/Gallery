const express = require('express');
const router = new express.Router();
const { loggedIn, protect } = require('../middlewares/auth');
const { register, login, info, updateMe, removeDp } = require('../controllers/userController');
// const { uploadToS3 } = require('../services/image-upload-s3');
const { checkDp, updateDp } = require('../middlewares/checkDp');
const { mediaUpload } = require('../services/image-upload');

// router.post('/register', uploadToS3('users-dp').single('profile'),register);
router.post('/register', mediaUpload('users-dp').single('dp'),register);
router.put('/login', login);

router.use(loggedIn, protect);

router.get('/info',info);
// router.put('/update', loggedIn, protect, checkDp, uploadToS3('users-dp').single('profile'), updateMe);
router.put('/update', mediaUpload('users-dp').single('profile'), updateDp, updateMe);
router.delete('/remove-dp',checkDp, removeDp);

module.exports = router;