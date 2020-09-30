import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { isAuthenticated } from 'authenticare/client/auth'
import { connect } from 'react-redux'
import Login from './Login'
import Register from './Register'

import { getUser } from '../api/api'
import { addUserInfo } from '../actions'

import Dashboard from './Dashboard/Dashboard'
import Transactions from './Transactions'
import Goals from './Goals'
import Rewards from './Rewards'
import Accounts from './Accounts'
import LandingPage from './LandingPage/LandingPage'

const App = (props) => {
  if (isAuthenticated()) {
    getUser()
      .then((user) => props.dispatch(addUserInfo(user)))
      .catch((err) => console.log(err))
  }

  return (
    <>
      {/* <Route path="/" component={Dashboard} /> */}
      <Route exact path="/" component={LandingPage} />
      <Route
        exact path="/login"
        render={({ history }) => {
          return isAuthenticated() ? (
            <Redirect to="/dashboard" />) : (<Login history={history} />)
        }}
      />
      <Route
        exact path="/register"
        render={({ history }) => {
          return isAuthenticated() ? (
            <Redirect to="/dashboard" />) : (<Register history={history} />)
        }}
      />
      <Switch>
        <Route
          path="/dashboard"
          render={({ history }) => <Dashboard history={history} />}
        />
        <Route path="/rewards">
          <Rewards />
        </Route>
        <Route path="/goals">
          <Goals />
        </Route>
        <Route path="/transactions">
          <Transactions />
        </Route>
        <Route path="/accounts">
          <Accounts />
        </Route>
      </Switch>
    </>
  )
}

export default connect()(App)
