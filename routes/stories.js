const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

const Story = require('../models/Story');

router.get('/', (req, res) => {
  Story.find({ status: 'public' })
    .populate('user')
    .then(stories => {
      res.render('stories/index', { stories });
    })
    .catch(err => console.log(err));
});

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

router.post('/', ensureAuthenticated, (req, res) => {
  const { title, body, status } = req.body;
  const allowComments = req.body.allowComments ? true : false;

  const newStory = {
    title,
    body,
    status,
    allowComments,
    user: req.user.id
  }

  new Story(newStory)
    .save()
    .then(story => {
      res.redirect(`/stories/show/${story.id}`);
    })
    .catch(err => console.log(err));
});

module.exports = router;