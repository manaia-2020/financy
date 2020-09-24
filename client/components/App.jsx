import React from 'react'
import { Route } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import Dashboard from './Dashboard'

const App = () => {
  return (
    <>
      <Nav />
      <IfNotAuthenticated>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </IfNotAuthenticated>

      <IfAuthenticated>
        <Dashboard />
      </IfAuthenticated>
    </>
  )
}

export default App
