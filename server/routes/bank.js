const express = require('express')
const { newTransaction, getCurrentBalance } = require('../database/bankDb')
const router = express.Router()

//this looks like I can add a transaction for any user I know the id of
//is that ok or do you need to use authenticare to determine the id of the user make this request
//checkout https://github.com/don-smith/authenticare/blob/master/docs/server/getTokenDecoder.md
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

//similarly do you inted for anyone to access the balance of any account they know the id of?
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
