const router = require('express').Router()
const Users = require('../models/Users')

router.get('/users', (req, res, next) => {
  if (req.user) {
    res.render('users')
  } else {
    res.redirect('/login')
  }
})

router.post('/users', (req, res, next) => {
  if (req.body.code === process.env.SECRET_KEY) {
    Users.findOneAndUpdate({ username: req.user.username }, { isValidated: true }, { new: true }).then(user => {
      res.redirect('/')
    }).catch(err => {
      next(err)
    })
  } else if (req.body.code === process.env.ADMIN) {
    Users.findOneAndUpdate({ username: req.user.username }, { isAdmin: true, isValidated: true }, { new: true }).then(user => {
      res.redirect('/')
    }).catch(err => {
      next(err)
    })
  } else {
    res.redirect('/users')
  }
})

module.exports = router
