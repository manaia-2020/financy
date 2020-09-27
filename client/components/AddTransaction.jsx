import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addNewTransaction } from '../api/api'

const AddTransaction = (props) => {
  useEffect(() => {

  }, [])

  const [newTrans, setNewTrans] = useState({
    amount: 0,
    name: '',
    date: '',
    frequency: 0
  })
  const [ showRecurring, setShowRecurring ] = useState(false)

  const postTransaction = (event) => {
    event.preventDefault()
    const newTransToAdd = { ...newTrans, showRecurring }
    addNewTransaction(props.userInfo.id, newTransToAdd)
    .then(balance => console.log(balance))
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewTrans({ ...newTrans, [name]: value })
  }

  const checkFloat = () => {
    const float = /^[-+]?[0-9]+\.[0-9]+$/
    return (Number(newTrans.amount) !== 0) ? newTrans.amount.match(float) : false
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
        <label htmlFor="accountSelect">Select an Account</label>
        <select onChange={handleChange} name="accountSelect" id="accountSelect">
          <option value=""></option>
          {props.accounts.map(account => <option key={account.id} value={account.id}>{account.name}</option>)}
        </select>
        <input onChange = {handleChange}type="date" name="date" id="date"/>
        <label htmlFor="selectrecurring">Recurring?</label>
        <input type="checkbox" name="showRecurring" id="showRecurring" value={true} onClick={toggleRecurring}/>
        <button type="submit" disabled={!checkFloat()}>Add New Trans</button>
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
