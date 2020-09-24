const express = require('express')
const router = express.Router()

const { getAccountDetails, addAccountDetails } = require('../database/db')

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  getAccountDetails(id)
    .then((accounts) => {
      return res.json(accounts)
    })
    .catch((err) => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/:id', (req, res) => {
  const id = Number(req.params.id)
  const { name, balance } = req.body

  addAccountDetails(id, { name, balance })
    .then((account) => {
      return res.sendStatus(200)
    })
    .catch((error) => {
      res.status(500).send('DATABASE ERROR:' + error.message)
    })
})

module.exports = router
