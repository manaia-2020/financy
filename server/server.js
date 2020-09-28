const path = require('path')
const express = require('express')

const server = express()

const { auth, accounts, goals, bank, medals, transactions, user } = require('./routes')

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/api/v1', auth)
server.use('/api/v1/user', user)
server.use('/api/v1/accounts', accounts)
server.use('/api/v1/bank', bank)
server.use('/api/v1/medals', medals)
server.use('/api/v1/goals', goals)
server.use('/api/v1/transactions', transactions)

module.exports = server
