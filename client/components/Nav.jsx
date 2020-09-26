import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { IfNotAuthenticated, IfAuthenticated } from './Authenticated'
import { logOff, isAuthenticated } from 'authenticare/client'

import Transactions from './Transactions'
import Dashboard from './Dashboard'
import Goals from './Goals'
import Rewards from './Rewards'
import Accounts from './Accounts'


const Nav = ({history, dispatch, userInfo}) => {
  const handleClick = () => {
    logOff()
    if (!isAuthenticated()) {
      history.push('/')
    }
  }

  return (
    <header id="header" className="fixed-top ">
      <div className="container-fluid"></div>
      <h1 className="logo mr-auto">Financy</h1>
      <ul>
        <IfNotAuthenticated>
          <Link to="/" className="active">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/team">
            <li>Team</li>
          </Link>
          <Link to="/login">
            <li>Log In</li>
          </Link>
          <Link to="/register">
            <li>Register</li>
          </Link>
        </IfNotAuthenticated>
        <IfAuthenticated>
          <ul>
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
          </ul>
          <h3> User ID: {userInfo.id} </h3>
          <h3> User Email: {userInfo.email} </h3>
          <button onClick={handleClick}>Log off</button>

          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/rewards">
              <Rewards />
            </Route>
            <Route path="/goals">
              <Goals />
            </Route>
            <Route exact path="/transactions">
              <Transactions />
            </Route>
            <Route exact path="/accounts">
              <Accounts />
            </Route>
          </Switch>
        </IfAuthenticated>
      </ul>
    </header>
  )
}

function mapStateToProps (state) {
  return {
    userInfo: state.addUserInfo
  }
}

export default connect(mapStateToProps)(Nav)
