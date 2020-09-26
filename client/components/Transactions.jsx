import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAccountApi, getUserAccountTransactions } from '../api/api'
import { getAccounts } from '../actions/accounts.action'

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([])
  const [accountId, setAccountId] = useState('')

  const { id } = props.userInfo
  useEffect(() => {
    // TODO change arg to id, it isn't persisting in global state
    getAccountApi(3)
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

  const requestTransactions = () => {
    // TODO change arg to id, it isn't persisting in global state
    return getUserAccountTransactions(3, accountId)
      .then(items => {
        setTransactions(items.trans)
        return null
      })
  }
  console.log(transactions);
  return (
    <div>
      <form onSubmit={requestTransactions}>
        <label htmlFor="accountSelect">Select an Account</label>
        <select onChange={handleChange} name="accountSelect" id="accountSelect">
          <option value=""></option>
          {props.accounts.map(account => <option key={account.id} value={account.id}>{account.name}</option>)}
        </select>
        <button type="submit">Get</button>
      </form>
      {transactions.length === 0 ? null : transactions.map(item => <h5 key={item.id}>{item.name}, {item.amount}</h5>)}
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
