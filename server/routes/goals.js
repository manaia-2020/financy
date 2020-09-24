const express = require('express')
const { saveNewGoal } = require('../database/goals.database')
const router = express.Router()

router.post('/', (req, res) => {
  const { name, date, id } = req.body

  saveNewGoal({ name, date, id })
    .then((id) => {
      return res.status(201).json(id[0])
    })
    .catch(err => console.log(err))
})

module.exports = router
