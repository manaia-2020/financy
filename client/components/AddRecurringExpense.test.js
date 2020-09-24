import React from 'react'
import { screen, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import AddRecurringExpense from './AddRecurringExpense'
import store from '../store'

test('Setup working', () => {
  expect(5).toBe(5)
})

describe('AddRecurringExpense', () => {
  test('Renders correct component', () => {
    render(<Provider store={store}><AddRecurringExpense /></Provider>)
    const component = screen.getByLabelText('expenseName')
    expect(component.innerHTML).toBe('Expense Name')
  })
})
