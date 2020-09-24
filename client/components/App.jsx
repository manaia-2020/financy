import React from 'react'
import { Route } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'
import About from './About'

const App = () => {
  return (
    <>
      <Nav />
      <LandingPage />
      <About />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />

      <IfAuthenticated>
        <Dashboard />
      </IfAuthenticated>
    </>
  )
}

export default App
