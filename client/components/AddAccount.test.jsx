import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { postAccount } from '../api/api'

import AddAccount from './AddAccount'
import store from '../store'

jest.spyOn(store, 'dispatch')

jest.mock('../api/api', () => ({
  postAccount: jest.fn()
}))

test('user can add new account in input', async () => {
  render(<Provider store={store}><AddAccount /></Provider>)
  expect.assertions(2)
  postAccount.mockImplementation(() => Promise.resolve(2))
  let name = screen.getByPlaceholderText('Account Name')
  let balance = screen.getByPlaceholderText('Balance')

  fireEvent.change(name, { target: { value: 'OnlyFans' } })
  fireEvent.change(balance, { target: { value: 10 } })

  const button = screen.getByRole('button')
  fireEvent.submit(button)
  expect(postAccount).toHaveBeenCalled()
  expect(postAccount).toHaveBeenCalledWith(1, { 'balance': '10', 'name': 'OnlyFans' })
})
