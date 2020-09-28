const express = require('express')
const { saveNewGoal, getAllGoalsByUserId } = require('../database/goals.database')
const router = express.Router()

router.post('/', (req, res) => {
  const { name, date, amount, id } = req.body

  saveNewGoal({ name, date, amount, id })
    .then((id) => {
      //overwriting the id var is dangerous - perhaps differentiate from userId and postId?
      //technically ids would be a better name as you are getting back an array of ids not one
      return res.status(201).json(id[0])
    })
    .catch(err => console.log(err)) 
})

//again, you are trusting the user to tell you what their id is - never trust your users
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  getAllGoalsByUserId(id)
    .then((goals) => res.status(201).json(goals))
    .catch(() => res.status(500).send('DATABASE ERROR'))
})

module.exports = router
