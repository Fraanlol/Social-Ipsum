const router = require('express').Router()
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/Users')
const bcrypt = require('bcryptjs')

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }).then(user => {
      if (!user) { return done(null, false, { message: 'Incorrect username' }) }
      bcrypt.compare(password, user.password).then(match => {
        if (!match) {
          return done(null, false, { message: 'Incorrect password' })
        }
        return done(null, user)
      })
    })
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  }).catch(err => {
    done(err)
  })
})

router.get('/login', function (req, res, next) {
  res.render('login', { user: req.user })
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

module.exports = router
