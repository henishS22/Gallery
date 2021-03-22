var express = require('express');
const Media = require('../models/media');
const User = require('../models/user');
var router = express.Router();
let id;
let name;

/* GET home page. */
router.get('/', function (req, res, next) {
  delete req.session.name;
  req.session.destroy(function (err) {
  })
  res.render('pages/index');
});

router.get('/login', async function (req, res, next) {
  res.render('pages/login');
})

router.get('/register', async function (req, res, next) {
  res.render('pages/register');
})

router.get('/profile', async function (req, res, next) {
  const data = await User.findOne({ _id: req.query.id });
  res.render('pages/profile', { data: data });
})

router.get('/gallery', async function (req, res) {
  id = req.query.user;
  if (req.session.name) {
    const user = await User.findOne({ _id: id });
    const data = await Media.find({ user: id, mediaType: req.query.type });
    res.render('pages/gallery', { user, allImg: data, favImg: 'undefined', videos: 'undefined', slides: 'undefined' });
  } else {
    res.redirect('pages/login');
  }
})

router.get('/slideshow', async function (req, res) {
  if (req.session.name) {
    const data = await Media.find({ user: req.query.id }).populate({ path: 'user' });
    const user = await User.findOne({ _id: req.query.id });
    res.render('pages/gallery', { user, favImg: 'undefined', allImg: 'undefined', videos: 'undefined', slides: data });
  } else {
    res.render('pages/login');
  }
})

router.get('/favourites', async function (req, res) {
  if (req.session.name) {
    const data = await Media.find({ isFavourite: 'true', user: req.query.id }).populate({ path: 'user' });
    const user = await User.findOne({ _id: req.query.id });
    console.log('session', req.session.name);

    res.render('pages/gallery', { user, favImg: data, allImg: 'undefined', videos: 'undefined', slides: 'undefined' });
  } else {
    res.render('pages/login');
  }
})

router.get('/videos', async function (req, res) {
  if (req.session.name) {
    const user = await User.findOne({ _id: req.query.user });
    const data = await Media.find({ mediaType: 'video', user: user });
    res.render('pages/gallery', { user, favImg: 'undefined', allImg: 'undefined', videos: data, slides: 'undefined' });
  } else {
    res.render('pages/login');
  }
})

module.exports = router;
