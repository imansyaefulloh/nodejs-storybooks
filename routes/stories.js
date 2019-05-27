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

router.get('/show/:id', (req, res) => {
  Story.findOne({ _id: req.params.id })
    .populate('user')
    .then(story => {
      res.render('stories/show', { story });
    })
    .catch(err => console.log(err));
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Story.findOne({ _id: req.params.id })
    .then(story => {
      res.render('stories/edit', { story });
    })
    .catch(err => console.log(err));
});

router.put('/:id', ensureAuthenticated, (req, res) => {
  Story.findOne({ _id: req.params.id })
    .then(story => {
      const { title, body, status } = req.body;
      const allowComments = req.body.allowComments ? true : false;

      story.title = title;
      story.body = body;
      story.status = status;
      story.allowComments = allowComments;

      story.save()
        .then(story => {
          res.redirect('/dashboard');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
  Story.remove({ _id: req.params.id })
    .then(() => {
      res.redirect('/dashboard');
    })
    .catch(err => console.log(err));
});

module.exports = router;