import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addTransaction } from '../api/api'

const AddRecurringExpense = (props) => {
  const [trans, setTrans] = useState('')

  const handleChange = (event) => {
    [event.target.name] = event.target.value
    setTrans(event.target.name)
  }

  const submitForm = (event) => {
    event.preventDefault()
    return addTransaction(trans)
      .then(() => {
        return null
      })
  }

  return (
    <>
      <h1>Add an Expense</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="expenseName">Expense Name</label>
        <input type="text" name="expenseName" id="expenseName" autoFocus={true} onChange={handleChange}/>
        <label htmlFor="frequency">How Often</label>
        <select name="frequency" id="frequency">
          <option value="7">Weekly</option>
          <option value="14">Fortnightly</option>
          <option value="28">Monthly</option>
          <option value="91">Quarterly</option>
          <option value="365">Annually</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
    </>
  )
}

export default connect()(AddRecurringExpense)
