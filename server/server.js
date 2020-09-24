const path = require('path')
const express = require('express')

const server = express()
const auth = require('./routes/auth')
const bank = require('./routes/bank')

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/api/v1', auth)
server.use('/api/v1/bank', bank)

module.exports = server
