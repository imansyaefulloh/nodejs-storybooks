const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

const Story = require('../models/Story');

router.get('/', ensureGuest, (req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Story.find({ user: req.user.id })
    .then(stories => {
      res.render('index/dashboard', { stories });
    })
    .catch(err => console.log(err));
});

router.get('/about', (req, res) => {
  res.render('index/about');
});

module.exports = router;