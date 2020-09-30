import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAccountApi, removeAccount } from '../api/api'
import { getAccounts, deleteAccount } from '../actions/accounts.action'
import AddAccount from './AddAccount'
import Content from './Dashboard/Content'

function Accounts (props) {
  const { accounts, userInfo, dispatch } = props

  useEffect(() => {
    if (userInfo.id) {
      getAccountApi(userInfo.id)
        .then((results) => dispatch(getAccounts(results)))
        .catch((err) => console.log(err.message))
    }
  }, [userInfo])

  function handleDelete (id) {
    removeAccount(id)
      .then(() => dispatch(deleteAccount(id)))
      .catch((err) => console.log(err.message))
  }

  const columns = ['name', 'balance', 'delete']
  return <Content type="account" columns={columns} rows={accounts} handleDelete={handleDelete} modal={<AddAccount />} />
}

function mapStateToProps (state) {
  return {
    accounts: state.accounts,
    userInfo: state.addUserInfo
  }
}

export default connect(mapStateToProps)(Accounts)
