import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAccountApi } from '../api/api'
import { getAccounts } from '../actions/accounts.action'

import AddAccount from './AddAccount'

function Accounts(props) {
  const { userInfo, accounts } = props
  useEffect(() => {
    getAccountApi(userInfo.id)
      .then((results) => {
        console.log(results)
        props.dispatch(getAccounts(results))
        return null
      }).catch((err) => {
        if (err) console.log(err.message)
      })
  }, [])

  return (
    <>
      <h1>Accounts</h1>
      <AddAccount />
      {accounts.map(acc => (
        <div key={acc.id} >
          <h4>{acc.name} - ${acc.balance}<button>X</button></h4>
        </div>
      ))
      }
    </ >
  )
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    userInfo: state.addUserInfo
  }
}

export default connect(mapStateToProps)(Accounts)
