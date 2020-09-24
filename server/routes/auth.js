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

module.exports = router
