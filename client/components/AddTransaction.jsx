import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addNewTransaction } from '../api/api'

const AddTransaction = (props) => {
  const [newTrans, setNewTrans] = useState({
    amount: 0,
    name: '',
    date: '',
    frequency: 0
  })
  const [ showRecurring, setShowRecurring ] = useState(false)

  const postTransaction = () => {
    // addNewTransaction
  }

  useEffect(() => {
    console.log(newTrans)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewTrans({ ...newTrans, [name]: value })
  }

  const checkFloat = (newTrans) => {
    return null
    // const float = /^[-+]?[0-9]+\.[0-9]+$/
    // return !!newTrans.amount.match(float)
  }

  const toggleRecurring = () => {
    return (!showRecurring) ? setShowRecurring(true) : setShowRecurring(false)
  }

  const viewRecurringForm = () => {
    return (
      <>
        <label htmlFor="frequency">How Often</label>
        <select onChange={handleChange} name="frequency" id="frequency">
          <option value="7">Weekly</option>
          <option value="14">Fortnightly</option>
          <option value="28">Monthly</option>
          <option value="91">Quarterly</option>
          <option value="365">Annually</option>
        </select>
      </>
    )
  }

  console.log(newTrans)
  return (
    <div>
      <h1>Add New Transaction</h1>
      <form onSubmit={postTransaction}>
        <label htmlFor="amount">Amount</label>
        <input onChange = {handleChange} type="text" name="amount" id="amount" autoFocus={true}/>
        <label htmlFor="expenseName">Expense Name</label>
        <input type="text" name="expenseName" id="expenseName" onChange={handleChange}/>
        <input onChange = {handleChange}type="date" name="date" id="date"/>
        <label htmlFor="selectrecurring">Recurring?</label>
        <input type="checkbox" name="showRecurring" id="showRecurring" value={true} onClick={toggleRecurring}/>
        <button type="submit" disabled={!checkFloat(newTrans)}>Add New Trans</button>
        {(showRecurring) ? viewRecurringForm() : null }
      </form>
    </div>
  )
}

function mapStatetoProps (state) {
  return {
    userInfo: state.addUserInfo,
    accounts: state.accounts
  }
}

export default connect(mapStatetoProps)(AddTransaction)
