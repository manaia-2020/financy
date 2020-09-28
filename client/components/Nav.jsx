import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { IfAuthenticated } from './Authenticated'
import { logOff, isAuthenticated } from 'authenticare/client'

const Nav = ({ history, dispatch, userInfo }) => {
  const handleClick = () => {
    logOff()
    if (!isAuthenticated()) {
      history.push('/')
    }
  }

  return (
    <>
      <IfAuthenticated>
        <li>
          <Link to="/dashboard">Profile</Link>
        </li>
        <li>
          <Link to="/rewards">Rewards</Link>
        </li>
        <li>
          <Link to="/goals">Goals</Link>
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
        <li>
          <Link to="/accounts">Accounts</Link>
        </li>
        <h3> User ID: {userInfo.id} </h3>
        <h3> User Email: {userInfo.email} </h3>
        <button onClick={handleClick}>Log off</button>
      </IfAuthenticated>
    </>
  )
}

function mapStateToProps (state) {
  return {
    userInfo: state.addUserInfo
  }
}

export default connect(mapStateToProps)(Nav)
