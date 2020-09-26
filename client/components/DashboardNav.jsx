import React from 'react'
import { Link } from 'react-router-dom'
import { logOff, isAuthenticated } from 'authenticare/client'
import { IfAuthenticated } from './Authenticated'

const DashboardNav = (props) => {
  const handleClick = () => {
    logOff()
    if (!isAuthenticated()) {
      props.history.push('/')
    }
  }

  return (
    <div>
      <IfAuthenticated>
        <Link to='/'><h4>Profile</h4></Link>
        <Link to='/rewards'><h4>Rewards</h4></Link>
        <Link to='/accounts'><h4>Accounts</h4></Link>
        <Link to='/goals'><h4>Goals</h4></Link>
        <Link to='/income'><h4>Income</h4></Link>
        <Link to='/expenses'><h4>Expenses</h4></Link>
        <button onClick={handleClick}>Log off</button>
      </IfAuthenticated>
    </div>
  )
}

export default DashboardNav
