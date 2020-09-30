const express = require('express')
const router = express.Router()

const { addAccountDetails, getAccountDetails } = require('../database/db')
const { deleteAccount, getAccountById } = require('../database/accountsDb')

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  getAccountDetails(id)
    .then((accounts) => res.status(201).json(accounts))
    .catch((err) => res.status(500).send('DATABASE ERROR: ' + err.message))
})

router.post('/:id', (req, res) => {
  const id = Number(req.params.id)
  addAccountDetails({ ...req.body, id })
    .then((createdAccountId) => getAccountById(createdAccountId[0]))
    .then((account) => res.status(201).json(account))
    .catch((error) => res.status(500).send('DATABASE ERROR:' + error.message))
})

router.delete('/:id', (req, res) => {
  const accountId = Number(req.params.id)
  deleteAccount(accountId)
    .then(() => res.sendStatus(200))
    .catch((error) => res.status(500).send('DATABASE ERROR:' + error.message))
})

module.exports = router
