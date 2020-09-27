import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addAccount } from '../actions/accounts.action'
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
    const id = props.userInfo.id
    event.preventDefault()
    props.dispatch(addAccount(account, id))
    postAccount(id, account)
      .then(console.log())
      .catch(err => console.log(err))
  }

  return (
    <>
      <h3>Add New Account</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Account Name</label>
        <input type="text" id='accountName' name="name" autoFocus={true} placeholder='Account Name' value={account.name} onChange={handleChange}></input>
        <label htmlFor="balance">Balance</label>
        <input type="number" id='accountBalance' name="balance" autoFocus={true} placeholder="NZ$0.00" value={account.balance} onChange={handleChange} ></input>
        <button type='submit'>Add Account</button>
      </form>
    </>
  )
}
const mapStateToProps = (state) => ({
  userInfo: state.addUserInfo
})

export default connect(mapStateToProps)(AddAccount)
