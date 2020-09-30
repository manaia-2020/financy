import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { isAuthenticated } from 'authenticare/client/auth'
import { connect } from 'react-redux'
import Login from './Login'
import Register from './Register'

import { getUser } from '../api/api'
import { addUserInfo } from '../actions'

import Dashboard from './Dashboard/Dashboard'
import LandingPage from './LandingPage/LandingPage'
import { setContent } from '../actions/content.action'

const App = (props) => {
  if (isAuthenticated()) {
    getUser()
      .then((user) => props.dispatch(addUserInfo(user)))
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Route path="/" render={({ history }) => <Dashboard history={history} /> } />
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
          render={() => <Redirect to="/dashboard" />}
        />
        <Route
          path="/rewards"
          render={() => {
            props.dispatch(setContent('rewards'))
          }}
        />
        <Route path="/goals" render={() => {
          props.dispatch(setContent('goals'))
        }} />
        <Route path="/transactions" render={() => {
          props.dispatch(setContent('transactions'))
        }} />
        <Route path="/accounts" render={() => {
          props.dispatch(setContent('account'))
        }} />
      </Switch>
    </>
  )
}

export default connect()(App)
