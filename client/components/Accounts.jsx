import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAccountApi, removeAccount } from '../api/api'
import { getAccounts, deleteAccount } from '../actions/accounts.action'

import AddAccount from './AddAccount'

function Accounts (props) {
  const { accounts, userInfo } = props
  useEffect(() => {
    getAccountApi(userInfo.id)
      .then((results) => {
        props.dispatch(getAccounts(results))
        return null
      }).catch((err) => {
        if (err) console.log(err.message)
      })
  }, [])

  function handleClick (id) {
    removeAccount(id)
    return props.dispatch(deleteAccount(id))
  }

  return (
    <>
      <h1>Accounts</h1>
      <AddAccount />
      {accounts.map(acc => (
        <div key={acc.name} >
          <h4>{acc.name} - {acc.balance}<button onClick={() => handleClick(acc.id)}>X</button></h4>
        </div>
      ))
      }
    </>
  )
}

function mapStateToProps (state) {
  return {
    accounts: state.accounts,
    userInfo: state.addUserInfo
  }
}

export default connect(mapStateToProps)(Accounts)
