import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAccountApi, getUserAccountTransactions, getBalance } from '../api/api'
import { getAccounts } from '../actions/accounts.action'
import AddTransaction from './AddTransaction'

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([])
  const [balances, setBalances] = useState([])
  const [accountId, setAccountId] = useState('')

  const { id } = props.userInfo
  useEffect(() => {
    getAccountApi(id)
      .then((results) => {
        props.dispatch(getAccounts(results))
        return null
      }).catch((err) => {
        if (err) console.log(err)
      })
  }, [])

  const handleChange = (event) => {
    [event.target.name] = event.target.value
    setAccountId(event.target.name)
  }

  const requestTransactions = (event) => {
    event.preventDefault()
    return getUserAccountTransactions(id, accountId)
      .then(items => {
        setTransactions(items.trans)
        return getBalance(accountId)
      })
      .then((newBalance) => {
        setBalances([...balances, newBalance])
        return null
      })
  }
  console.log(transactions)
  console.log(balances)
  return (
    <div>
      <div>
        <AddTransaction />
      </div>
      <h1>View Transactions</h1>
      <form onSubmit={requestTransactions}>
        <label htmlFor="accountSelect">Select an Account</label>
        <select onChange={handleChange} name="accountSelect" id="accountSelect">
          <option value=""></option>
          {props.accounts.map(account => <option key={account.id} value={account.id}>{account.name}</option>)}
        </select>
        <button type="submit">Get</button>
      </form>
      {transactions.length === 0 ? null : transactions.map(item => <h5 key={item.id}>{item.name}, {item.amount}</h5>)}
      {balances.length === 0 ? null : balances.map(item => <h5 key={item.balance_updated_at}>{item.balance}</h5>)}
    </div>
  )
}

function mapStatetoProps (state) {
  return {
    userInfo: state.addUserInfo,
    accounts: state.accounts
  }
}
export default connect(mapStatetoProps)(Transactions)
