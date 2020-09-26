import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { postGoal } from '../api/goals.api'

import AddGoal from './AddGoal'
import store from '../store'

jest.spyOn(store, 'dispatch')

jest.mock('../api/goals.api', () => ({
  postGoal: jest.fn()
}))

test('user can add new account in input', async () => {
  render(<Provider store={store}><AddGoal /></Provider>)
  postGoal.mockImplementation(() => Promise.resolve(2))

  const name = screen.getByPlaceholderText('goal name')
  const amount = screen.getByPlaceholderText('goal amount')
  const date = screen.getByPlaceholderText('goal date')
  const button = screen.getByRole('button')

  fireEvent.change(name, { target: { value: 'pin jesus to cross' } })
  fireEvent.change(amount, { target: { value: '$23.30' } })
  fireEvent.change(date, { target: { value: '2020-12-12' } })
  fireEvent.submit(button)

  expect.assertions(2)
  expect(postGoal).toHaveBeenCalled()
  expect(postGoal).toHaveBeenCalledWith({ amount: 'NZ$0.00', date: '2020-12-12', name: 'pin jesus to cross' }, 2)
})
