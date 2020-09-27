// Incorporated into AddTransaction
// import React from 'react'
// import { screen, render, fireEvent } from '@testing-library/react'
// import { Provider } from 'react-redux'
// import AddRecurringExpense from './AddRecurringExpense'
// import store from '../store'
// import { addTransaction } from '../api/api'

// jest.mock('../api/api', () => ({
//   addTransaction: jest.fn()
// }))

// test('Setup working', () => {
//   expect(5).toBe(5)
// })

// describe('AddRecurringExpense', () => {
//   addTransaction.mockImplementation(() => Promise.resolve('Added'))
//   test('Input field updates correctly', () => {
//     expect.assertions(1)
//     render(<Provider store={store}><AddRecurringExpense /></Provider>)
//     const transName = screen.getByLabelText('Expense Name')
//     fireEvent.change(transName, { target: { value: 'Bills' } })
//     expect(transName.value).toBe('Bills')
//   })

//   test('Check Api function called', () => {
//     expect.assertions(1)
//     render(<Provider store={store}><AddRecurringExpense /></Provider>)
//     const submit = screen.getByRole('button')
//     fireEvent.click(submit)
//     expect(addTransaction).toHaveBeenCalled()
//   })
// })
