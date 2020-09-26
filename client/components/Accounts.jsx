import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAccountApi, removeAccount } from '../api/api'
import { getAccounts, deleteAccount } from '../actions/accounts.action'

import AddAccount from './AddAccount'

function Accounts(props) {
  const { userInfo, accounts } = props
  useEffect(() => {
    //change 3 to id once userId is persisting in Global state
    getAccountApi(3)
      .then((results) => {
        props.dispatch(getAccounts(results))
        return null
      }).catch((err) => {
        if (err) console.log(err.message)
      })
  }, [])

  //change 3 to id once userId is persisting in Global state
  function handleClick(id, accId) {
    removeAccount(id, accId)
    return props.dispatch(deleteAccount(accId))
  }

  return (
    <>
      <h1>Accounts</h1>
      <AddAccount />
      {accounts.map(acc => (
        <div key={acc.id} >
          <h4>{acc.name} - ${acc.balance}<button onClick={() => handleClick(acc.userId, acc.id)}>X</button></h4>
        </div>
      ))
      }
    </>
  )
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    userInfo: state.addUserInfo
  }
}

export default connect(mapStateToProps)(Accounts)
