const express = require('express')
const { getTokenDecoder } = require('authenticare/server')
const { saveNewGoal, getAllGoalsByUserId, deleteGoalById, getGoalById } = require('../database/goalsDb')
const router = express.Router()

router.post('/', (req, res) => {
  const { name, date, amount, id } = req.body

  saveNewGoal({ name, date, amount, id })
    .then((id) => getGoalById(id))
    .then((goal) => res.status(201).json(goal))
    .catch(() => res.status(500).send('DATABASE ERROR'))
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  getAllGoalsByUserId(id)
    .then((goals) => res.status(201).json(goals))
    .catch(() => res.status(500).send('DATABASE ERROR'))
})

router.delete('/', getTokenDecoder(), async (req, res) => {
  try {
    if (req.user) {
      const id = req.body.id
      const goal = await getGoalById(id)
      if (goal.user_id === req.user.id) await deleteGoalById(id)
      res.sendStatus(201)
    }
  } catch (err) {
    res.sendStatus(500)
  }
})

module.exports = router
