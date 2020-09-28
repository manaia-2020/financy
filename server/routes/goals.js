const express = require('express')
const { saveNewGoal, getAllGoalsByUserId } = require('../database/goalsDb')
const router = express.Router()

router.post('/', (req, res) => {
  const { name, date, amount, id } = req.body

  saveNewGoal({ name, date, amount, id })
    .then((id) => {
      return res.status(201).json(id[0])
    })
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  getAllGoalsByUserId(id)
    .then((goals) => res.status(201).json(goals))
    .catch(() => res.status(500).send('DATABASE ERROR'))
})

module.exports = router
