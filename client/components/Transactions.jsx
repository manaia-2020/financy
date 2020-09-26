import React from 'react'
import { connect } from 'react-redux'

import AddAccount from './AddAccount'

const Transactions = (props) => {
  return (
    <div>
      <h1>Transactions</h1>
      <AddAccount />
    </div>
  )
}

export default connect()(Transactions)
