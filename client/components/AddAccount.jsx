import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addAccount } from '../actions/index'
import { postAccount } from '../api/api'

const AddAccount = (props) => {
  const [account, setAccount] = useState({
    name: '',
    balance: ''
  })

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setAccount({ ...account, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.dispatch(addAccount(account))
    postAccount(account)
      .then(console.log)
      .catch(err => console.log(err))
  }

  return (
    <>
      <h1>Add Account Balance</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Account Name</label>
        <input type="text" id='accountName' name="name" placeholder='Account Name' value={account.name} onChange={handleChange}></input>
        <label htmlFor="balance">Balance $</label>
        <input type="number" id='accountBalance' name="balance" placeholder="Balance" value={account.balance.toLocaleString()} onChange={handleChange} ></input>
        <button type='submit'>Add Account</button>
      </form>
    </>
  )
}

export default connect()(AddAccount)
