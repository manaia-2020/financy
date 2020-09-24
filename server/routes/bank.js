const express = require('express')
const { getTransactions, newTransaction } = '../database/bankDb.js'
const router = express.Router()

router.get('/bank/:id/transactions', (req, res) => {
  const userId = Number(req.params.id)
  return getTransactions(userId)
    .then((transactions) => {
      res.json({ transactions })
    }).catch((err) => {
      sendErr(err, res)
    })
})

router.post('/bank/:id/addTransaction', (req, res) => {
  const userId = Number(req.params.id)
  return newTransaction(req.body, userId)
    .then((result) => {
      res.status(201)
      res.json(result)
    }).catch((err) => {
      sendErr(err, res)
    })
})

function sendErr (err, res) {
  res.status(500).send('Databse Error' + err.msg)
}
