import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  getAccountApi,
  getUserAccountTransactions
} from '../api/api'
import { getAccounts } from '../actions/accounts.action'
import AddTransaction from './AddTransaction'
import Content from './Dashboard/Content'

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([])

  const { id } = props.userInfo
  useEffect(() => {
    if (id) {
      getAccountApi(id)
        .then((results) => props.dispatch(getAccounts(results)))
        .catch((err) => console.log(err))
    }
  }, [props.userInfo])

  const handleChange = (event) => {
    if (event.target.value) requestTransactions(event)
  }

  const requestTransactions = (event) => {
    event.preventDefault()
    return getUserAccountTransactions(id, event.target.value)
      .then((items) => setTransactions(items.trans))
  }

  const columns = ['name', 'amount', 'date']
  const message = 'That money coming out better be for investments girl'
  return <Content type="transaction" columns={columns} rows={transactions} handleChange={handleChange} modal={<AddTransaction />} message={message}/>
}

function mapStatetoProps (state) {
  return {
    userInfo: state.addUserInfo,
    accounts: state.accounts
  }
}

export default connect(mapStatetoProps)(Transactions)
