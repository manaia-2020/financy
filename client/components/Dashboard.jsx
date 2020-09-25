import React from 'react'

import DashboardNav from './DashboardNav'

const Dashboard = (props) => {
  return (
    <div>
      <DashboardNav history={props.history} />
    </div>
  )
}

export default Dashboard
