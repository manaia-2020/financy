import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addGoal } from '../actions/goals.action'
import { postGoal } from '../api/goals.api'
import { formatAmount, localStringToNumber } from '../utils/currency'

function AddGoal (props) {
  const [goal, setGoal] = useState({
    name: '',
    amount: '',
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
    const id = props.userInfo.id
    event.preventDefault()
    props.dispatch(addGoal(goal, id))
    
    //dirty dirty console logs, begone foul beasts
    postGoal(goal, id)
      .then(console.log)
      .catch(console.log)
  }

  function handleBlur ({ target }) {
    const { name, value } = target
    setGoal({
      ...goal,
      [name]: formatAmount(value)
    })
  }

  function handleFocus ({ target }) {
    const { name, value } = target
    setGoal({
      ...goal,
      [name]: localStringToNumber(value)
    })
  }

  return (
    <>
      <h1>Add Financial Goal</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="goalName">Goal Name</label>
        <input type="text" id="goalName" name="name" autoFocus={true} onChange={handleChange} value={goal.name} placeholder="goal name" />
        <label htmlFor="goalAmount">Goal Amount</label>
        <input type="currency" id="goalAmount" name="amount" autoFocus={true} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} value={goal.amount} placeholder="goal amount" />
        <label htmlFor="goalDate">Goal Date</label>
        <input type="date" id="goalDate" name="date" autoFocus={true} onChange={handleChange} value={goal.date} placeholder="goal date" />
        <button type="submit">Add Goal</button>
      </form>
    </>
  )
}

const mapStateToProps = (state) => ({
  userInfo: state.addUserInfo
})

export default connect(mapStateToProps)(AddGoal)
