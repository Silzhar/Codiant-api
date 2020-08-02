/* eslint-disable import/no-unresolved */
require('dotenv').config()
require('./config/db')

const express = require('express')
const session = require('express-session')
const path = require('path')
const cors = require('cors')

const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')

const passport = require('./config/passport')
const userRoute = require('./routes/user.auth.routes')
const pseudoRoute = require('./routes/pseudocode.routes')
const dashboardRoute = require('./routes/dashboard.routes')
const jsGameRouter = require('./routes/jsGameLogic.routes')
const sbsRouter = require('./routes/sbs.routes')

const server = express()
// Metemos un CORS básico para poder usar la API desde el frontend
server.use(cors({ origin: true, credentials: true }))

server.use(express.static(path.join(__dirname, 'public'))) // Añade soporte para estáticos a Express
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

// const { isAuthenticated } = require('./middlewares/auth.middleware')
const errorMiddleware = require('./middlewares/error.middleware')

server.use(
  session({
    secret: 'cookie-secret-test',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

server.use(passport.initialize())
server.use(passport.session())
server.use(errorMiddleware)

server.use('/api/user', userRoute)
// server.use('/api/admin', [isAuthenticated, isAdminRole])
server.use('/api/pseudocode', pseudoRoute)
server.use('/api/dashboard', dashboardRoute)
server.use('/api/javascript', jsGameRouter)
server.use('/api/sbs', sbsRouter)

const { PORT } = process.env
server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})
