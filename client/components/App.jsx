import React from 'react'
import Login from './Login'
import Register from './Register'
import {Route} from 'react-router-dom'

const App = () => {
  return (
    <>

      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </>
  )
}

export default App
