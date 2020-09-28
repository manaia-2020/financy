const express = require('express')
const { getTokenDecoder } = require('authenticare/server')

const router = express.Router()

//this is the way to do it - do you still need the 'auth/' route in auth.js?
router.get('/', getTokenDecoder(), async (req, res) => {
  if (req.user) {
    res.status(200).json({
      id: req.user.id,
      email: req.user.username
    })
  } else {
    res.sendStatus(500)
  }
})

module.exports = router
