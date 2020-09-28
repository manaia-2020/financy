const express = require('express')
const { newTransaction, getCurrentBalance } = require('../database/bankDb')
const router = express.Router()

router.post('/:id/addTransaction', (req, res) => {
  const userId = Number(req.params.id)
  if (!userId) return res.status(400).send('No UserId Specified')
  return newTransaction(req.body, userId)
    .then((newTransId) => {
      res.status(201)
      res.json(newTransId)
      return null
    })
    .catch((err) => {
      sendErr(err, res)
    })
})

router.get('/balance/:accountId', (req, res) => {
  const accountId = Number(req.params.accountId)
  return getCurrentBalance(accountId)
    .then((balance) => {
      res.status(200)
      res.json(balance)
      return null
    }).catch((err) => {
      sendErr(err, res)
    })
})

function sendErr (err, res) {
  res.status(500).send('Database Error ' + err.msg)
}

module.exports = router
