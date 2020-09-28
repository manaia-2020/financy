import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from 'authenticare/client/auth'
import { connect } from 'react-redux'
import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import { getUser } from '../api/api'
import { addUserInfo } from '../actions'

const App = (props) => {
  if (isAuthenticated()) {
    getUser()
      .then((user) => props.dispatch(addUserInfo(user)))
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Route path="/" component={Nav} />
      <Route
        exact
        path="/login"
        render={({ history }) => {
          return isAuthenticated() ? (
            <Redirect to="/dashboard" />
          ) : (
            <Login history={history} />
          )
        }}
      />
      <Route
        exact path="/register"
        render={({ history }) => {
          return isAuthenticated() ? (
            <Redirect to="/dashboard" />
          ) : (
            <Register history={history} />
          )
        }}
      />
    </>
  )
}

export default connect()(App)
