const express = require('express');
const router = express.Router();
const { findById } = require('../db-services/user-services');
const { findUserMediaByType, findUserMedia, favMedia} = require('../db-services/media-services');

router.get('/', function (req, res, next) {
  delete req.session.name;
  res.render('pages/index');
});

router.get('/login', async function (req, res, next) {
  const errors = req.flash().error || [];
  res.render('pages/login', {errors});
})

router.get('/register', async function (req, res, next) {
  res.render('pages/register');
})

router.get('/profile', async function (req, res, next) {
  const data = await findById(req.query.id);
  res.render('pages/profile', { data: data });
})

router.get('/gallery', async function (req, res) {
  const id = req.query.user;
  if (req.session.name) {
    const user = await findById(id);
    const data = await findUserMediaByType(id, req.query.type);
    res.render('pages/gallery', { user, allImg: data, favImg: 'undefined', videos: 'undefined', slides: 'undefined' });
  } else {
    res.redirect('/login');
  }
})

router.get('/slideshow', async function (req, res) {
  if (req.session.name) {
    const data = await findUserMedia(req.query.id);
    const user = await findById(req.query.id);
    res.render('pages/gallery', { user, favImg: 'undefined', allImg: 'undefined', videos: 'undefined', slides: data });
  } else {
    res.redirect('/login');
  }
})

router.get('/favourites', async function (req, res) {
  if (req.session.name) {
    const data = await favMedia(req.query.id, 'true' );
    const user = await findById(req.query.id);
    console.log('session', req.session.name);

    res.render('pages/gallery', { user, favImg: data, allImg: 'undefined', videos: 'undefined', slides: 'undefined' });
  } else {
    res.redirect('/login');
  }
})

router.get('/videos', async function (req, res) {
  if (req.session.name) {
    const user = await findById(req.query.user);
    const data = await findUserMediaByType(user._id,'video');
    res.render('pages/gallery', { user, favImg: 'undefined', allImg: 'undefined', videos: data, slides: 'undefined' });
  } else {
    res.redirect('/login');
  }
})

module.exports = router;
