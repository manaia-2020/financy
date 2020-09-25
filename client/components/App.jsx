import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from 'authenticare/client/auth'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import Dashboard from './Dashboard'

const App = () => {
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
        path="/register"
        render={({ history }) => {
          return isAuthenticated() ? (
            <Redirect to="/dashboard" />
          ) : (
            <Register history={history} />
          )
        }}
      />
      <Route path="/dashboard" render={({ history }) => {
        return <Dashboard history={history} />
      }} />
    </>
  )
}

export default App
