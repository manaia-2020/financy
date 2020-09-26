import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAccountApi } from '../api/api'
import { getAccounts } from '../actions/accounts.action'

const Transactions = (props) => {
  useEffect(() => {
    getAccountApi(props.userInfo.id)
      .then((results) => {
        props.dispatch(getAccounts(results))
        return null
      }).catch((err) => {
        if (err) console.log(err)
      })
  }, [])

  return (
    <div>
      <label htmlFor="accountSelect">Select an Account</label>
      <select name='accountSelect'>
        {props.accounts.map(account => <option key={account.id} value={account.id}>{account.name}</option>)}
      </select>
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
