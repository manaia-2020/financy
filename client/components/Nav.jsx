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
import LandingPage from './LandingPage/LandingPage'

const Nav = ({ history, dispatch, userInfo }) => {
  const handleClick = () => {
    logOff()
    if (!isAuthenticated()) {
      history.push('/')
    }
  }

  //Nav component is actually rendering the pag contents? 
  //Maybe it shouldnt' be called Nav anymore 
  //or that stuff should be rendered somewhere else
  return (
    <>
      <IfNotAuthenticated>
        <LandingPage />
      </IfNotAuthenticated>

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
    </>
  )
}

function mapStateToProps (state) {
  return {
    userInfo: state.addUserInfo
  }
}

export default connect(mapStateToProps)(Nav)
