const path = require('path')
const express = require('express')

const server = express()

// try putting a single index.js in ./routes so you can get everything via
// const {auth, accounts, ...} = require('./routes')
const auth = require('./routes/auth')
const accounts = require('./routes/accounts')
const goals = require('./routes/goals')
const bank = require('./routes/bank')
const medals = require('./routes/medals')
const transactions = require('./routes/transactions')
const user = require('./routes/user')

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
