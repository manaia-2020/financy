import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addNewTransaction } from '../api/api'
import AddRecurringExpense from './AddRecurringExpense'

const AddTransaction = (props) => {
  const [newTrans, setNewTrans] = useState()
  const [ showRecurring, setShowRecurring ] = useState(false)

  const postTransaction = () => {
    // addNewTransaction
  }

  useEffect(() => {
    console.log(newTrans);
  }, [])

  const handleChange = (event) => {
    [event.target.name] = event.target.value
    setNewTrans(event.target.name)
  }

  const viewRecurringForm = () => {
    return (!showRecurring) ? setShowRecurring(true) : setShowRecurring(false)
  }

  console.log(newTrans)
  return (
    <div>
      <h1>Add New Transaction</h1>
      <form onSubmit={postTransaction}>
        <input onChange = {handleChange} type="text" name="amount" id="amount" placeholder="Amount"/>
        <input onChange = {handleChange}type="date" name="date" id="date"/>
        <label htmlFor="selectrecurring">Recurring?</label>
        <input type="checkbox" name="selectrecurring" id="selectrecurring" onClick={viewRecurringForm}/>
        <button type="submit">Add New Trans</button>
      </form>
      {(showRecurring) ? <AddRecurringExpense /> : null}

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
