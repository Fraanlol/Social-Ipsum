const bcrypt = require('bcryptjs')
const router = require('express').Router()
const User = require('../models/Users')

router.get('/sign-up', function (req, res, next) {
  res.render('sign-up-form.ejs')
})

router.post('/sign-up', function (req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) return err
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    })

    user.save().then(() => {
      res.redirect('/login')
    }).catch(err => {
      next(err)
    })
  })
})

module.exports = router
