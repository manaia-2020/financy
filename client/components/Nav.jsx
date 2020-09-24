import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = () => {
  return (
    <div>
      <Link to='/'><h4>HOME</h4></Link>
      <Link to='/about'><h4>About</h4></Link>
      <Link to='/team'><h4>Team</h4></Link>
      <Link to='/login'><h4>Log In</h4></Link>
      <Link to='/register'><h4>Register</h4></Link>
    </div>
  )
}

export default NavBar