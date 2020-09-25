import React from 'react'

import DashboardNav from './DashboardNav'
import AddAccount from './AddAccount'

const Dashboard = (props) => {
  return (
    <div>
      <DashboardNav history={props.history} />
      <AddAccount />
    </div>
  )
}

export default Dashboard
