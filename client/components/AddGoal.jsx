import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addGoal } from '../actions/goals.action'
import { postGoal } from '../api/goals.api'

function AddGoal (props) {
  const [goal, setGoal] = useState({
    name: '',
    date: new Date().toLocaleDateString('en-CA')
  })

  function handleChange ({ target }) {
    const { name, value } = target
    // eslint-disable-next-line no-prototype-builtins
    if (goal.hasOwnProperty(name)) {
      setGoal({
        ...goal,
        [name]: value
      })
    }
  }

  function handleSubmit (event) {
    const id = 2
    event.preventDefault()
    props.dispatch(addGoal(goal, id))
    postGoal(goal, id)
      .then(console.log)
      .catch(console.log)
  }

  return (
    <>
      <h1>Add Financial Goal</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="goalName">Goal Name</label>
        <input type="text" id="goalName" name="name" autoFocus={true} onChange={handleChange} value={goal.name} />
        <label htmlFor="goalDate">Goal Date</label>
        <input type="date" id="goalDate" name="date" autoFocus={true} onChange={handleChange} value={goal.date} />
        <button type="submit">Add Goal</button>
      </form>
    </>
  )
}

export default connect()(AddGoal)
