require('dotenv').config()
require('./mongo')
const express = require('express')
const path = require('path')
const session = require('express-session')
const passport = require('passport')

const errorHandler = require('./errorHandler.js')
const indexRouter = require('./routes/index.js')
const loginRoute = require('./routes/auth.js')
const registerRoute = require('./routes/register.js')
const dataRouter = require('./routes/data.js')

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'styles')))

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }))
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/', loginRoute)
app.use('/', registerRoute)
app.use('/', dataRouter)

app.get('/', (req, res) => res.render('index'))
app.get('/sign-up', (req, res) => res.render('sign-up-form'))

app.use(errorHandler)

app.listen(3000, () => console.log('app listening on port 3000!'))
