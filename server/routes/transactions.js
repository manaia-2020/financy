const express = require('express')
const { getAllTransForUserAccount } = require('../database/transactionsDb')
const router = express.Router()

router.get('/:userId/:accountId', (req, res) => {
  const { userId, accountId } = req.params
  return getAllTransForUserAccount(userId, accountId)
    .then((trans) => {
      res.send({ trans })
      return null
    })
    .catch((err) => {
      sendErr(err, res)
    })
})

function sendErr (err, res) {
  res.status(500).send('Database Error ' + err.msg)
}

module.exports = router
