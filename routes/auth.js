const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  console.log(req.user);
  res.redirect('/dashboard');
});

router.get('/verify', (req, res) => {
  if (req.user) {
    // console.log(req.user);
    console.log('logged in');
  } else {
    console.log('Not logged in');
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;