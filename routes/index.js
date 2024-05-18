const router = require('express').Router()
const Posts = require('../models/Posts')

router.get('/', function (req, res, next) {
  Posts.find({}).sort({ date: -1 }).limit(10).then(posts => {
    res.render('index', { user: req.user, posts })
  })
})

router.post('/posts', (req, res, next) => {
  const date = new Date()
  const post = new Posts({
    title: req.body.title,
    content: req.body.content,
    date,
    author: req.user.username
  })
  post.save().then(() => {
    res.redirect('/')
  }).catch(err => {
    next(err)
  })
})

module.exports = router
