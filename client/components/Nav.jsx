import React from 'react'
import { Link } from 'react-router-dom'
import { IfNotAuthenticated } from './Authenticated'

const Nav = () => {
  return (
    <header id="header" className="fixed-top ">
      <div className="container-fluid"></div>
      <h1 className="logo mr-auto">Financy</h1>
      <ul>
        <IfNotAuthenticated>
          <Link to='/' className="active"><li>Home</li></Link>
          <Link to='/about'><li>About</li></Link>
          <Link to='/team'><li>Team</li></Link>
          <Link to='/login'><li>Log In</li></Link>
          <Link to='/register'><li>Register</li></Link>
        </IfNotAuthenticated>
      </ul>
    </header>
  )
}

export default Nav
