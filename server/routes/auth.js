const express = require('express')
const router = express.Router()
const { applyAuthRoutes } = require('authenticare/server')

const {
  userExists,
  saveNewUser,
  getUserByName
} = require('../database/db')

applyAuthRoutes(router, {
  userExists,
  createUser: saveNewUser,
  getUserByName
})

//what is this route for? It looks like it will get the id of a user with no auth in it
// either needs to be removed, renamed or put under test
router.get('/auth', (req, res) => {
  const email = req.query.email
  getUserByName(email)
    .then(user => {
      const userInfo = {
        id: user.id,
        email: user.username
      }
      res.json(userInfo)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
