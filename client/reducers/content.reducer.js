import React from 'react'
import { SET_MAIN_CONTENT } from '../actions/content.action'
import Accounts from '../components/Accounts'
import Goals from '../components/Goals'
import Transactions from '../components/Transactions'

const initialState = <h1>Hello</h1>

export default function contentReducer (state = initialState, action) {
  switch (action.type) {
    case SET_MAIN_CONTENT:
      switch (action.payload.type) {
        case 'account':
          return <Accounts />

        case 'goals':
          return <Goals />

        case 'transactions':
          return <Transactions />
      }

    default:
      return state
  }
}
