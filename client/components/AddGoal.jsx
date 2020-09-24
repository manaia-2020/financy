import React, { useState } from 'react'
import { connect } from 'react-redux'

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
    event.preventDefault()
    // TODO: post goal information and userId to api
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
