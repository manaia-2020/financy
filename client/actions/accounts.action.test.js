import { getAccounts, addAccount, deleteAccount } from './accounts.action'

test('getAccounts returns accounts', () => {
  const action = getAccounts({ name: 'Adventure Account', balance: 500 })
  expect(action.accounts).toEqual({ name: 'Adventure Account', balance: 500 })
})

test('addAccount adds account details by userId', () => {
  const action = addAccount({ name: 'Spending Account', balance: 10 }, 1)
  expect(action.type).toBe('ADD_ACCOUNT')
})

test('deleteAccount deletes account by id', () => {
  const action = deleteAccount(1)
  expect(action.type).toBe('DELETE_ACCOUNT')
})
