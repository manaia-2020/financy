const express = require('express')
const { getTransactions, newTransaction, getCurrentBalance } = require('../database/bankDb')
const router = express.Router()

router.get('/:id/transactions', (req, res) => {
  const userId = Number(req.params.id)
  if (!userId) return res.status(400).send('No UserId Specified')
  return getTransactions(userId)
    .then((transactions) => {
      res.json({ transactions })
      return null
    }).catch((err) => {
      sendErr(err, res)
    })
})

router.post('/:id/addTransaction', (req, res) => {
  const userId = Number(req.params.id)
  if (!userId) return res.status(400).send('No UserId Specified')
  return newTransaction(req.body, userId)
    .then((result) => {
      console.log(result)
      return getCurrentBalance(userId, req.body.accountSelect)
    })
    .then((balance) => {
      console.log(balance)
      res.json(balance)
      return null
    })
  // res.status(201)
  // res.json(result)
  // return null
    .catch((err) => {
      sendErr(err, res)
    })
})

function sendErr (err, res) {
  res.status(500).send('Database Error ' + err.msg)
}

module.exports = router
