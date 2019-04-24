const router = require('express').Router()
const { User } = require('./db')
module.exports = router

router.delete('/', (req, res, next) => {
  req.session.destroy(() => res.sendStatus(204))
})

router.get('/', (req, res, next) => {
  if (!req.session.user) {
    const error = new Error('not logged in')
    error.status = 401
    return next(error)
  }
  res.send(req.session.user)
})

router.post('/', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then(user => {
      if (!user) {
        const error = new Error()
        error.status = 401
        error.message = 'Incorrect username or password'
        throw error
      }
      req.session.user = user
      res.send(user)
    })
    .catch(next)
})
