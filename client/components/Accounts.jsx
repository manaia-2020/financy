import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAccountApi, removeAccount } from '../api/api'
import { getAccounts, deleteAccount } from '../actions/accounts.action'
import AddAccount from './AddAccount'
import Content from './Dashboard/Content'
import { setContent } from '../actions/content.action'
function Accounts (props) {
  const { accounts, userInfo, dispatch } = props

  useEffect(() => {
    if (userInfo.id) {
      getAccountApi(userInfo.id)
        .then((results) => dispatch(getAccounts(results)))
        .catch((err) => console.log(err.message))
    }
  }, [userInfo])

  useEffect(() => {
    dispatch(setContent('account'))
  }, [])

  function handleDelete (id) {
    removeAccount(id)
      .then(() => dispatch(deleteAccount(id)))
      .catch((err) => console.log(err.message))
  }

  const columns = ['name', 'balance', 'delete']
  const message = 'Girl you dont got any money, you better go get that bread'
  return <Content type="account" columns={columns} rows={accounts} handleDelete={handleDelete} modal={<AddAccount />} message={message} />
}

function mapStateToProps (state) {
  return {
    accounts: state.accounts,
    userInfo: state.addUserInfo
  }
}

export default connect(mapStateToProps)(Accounts)
