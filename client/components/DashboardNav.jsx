import React from 'react'
import { Link } from 'react-router-dom'

const DashboardNav = () => {
  return (
    <div>
      <Link to='/'><h4>Profile</h4></Link>
      <Link to='/rewards'><h4>Rewards</h4></Link>
      <Link to='/goals'><h4>Goals</h4></Link>
      <Link to='/income'><h4>Income</h4></Link>
      <Link to='/expenses'><h4>Expenses</h4></Link>
    </div>
  )
}

export default DashboardNav
