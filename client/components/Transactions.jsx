import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  getAccountApi,
  getUserAccountTransactions,
  getBalance
} from '../api/api'
import { getAccounts } from '../actions/accounts.action'
import AddTransaction from './AddTransaction'
import Content from './Dashboard/Content'
import { setContent } from '../actions/content.action'

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([])
  const [balances, setBalances] = useState([])

  const { id } = props.userInfo
  useEffect(() => {
    if (id) {
      getAccountApi(id)
        .then((results) => props.dispatch(getAccounts(results)))
        .catch((err) => console.log(err))
      props.dispatch(setContent('transaction'))
    }
  }, [props.userInfo])

  const handleChange = (event) => {
    if (event.target.value) requestTransactions(event)
  }

  const requestTransactions = (event) => {
    event.preventDefault()
    return getUserAccountTransactions(id, event.target.value)
      .then((items) => {
        setTransactions(items.trans)
        return getBalance(event.target.value)
      })
      .then((newBalance) => setBalances(newBalance))
  }

  const columns = ['name', 'amount', 'date']
  return <Content type="transaction" columns={columns} rows={transactions} handleChange={handleChange} modal={<AddTransaction />} />
}

function mapStatetoProps (state) {
  return {
    userInfo: state.addUserInfo,
    accounts: state.accounts
  }
}

export default connect(mapStatetoProps)(Transactions)
