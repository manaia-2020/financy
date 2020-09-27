import nock from 'nock'
import { getAccountApi, removeAccount } from './api'

test('getAccountApi fetches accounts from server', () => {
  nock(/localhost/)
    .get('/api/v1/accounts/1')
    .reply(201, [{ name: 'Only Fans', balance: 10 }])

  return getAccountApi(1)
    .then(accounts => {
      expect(accounts[0].name).toBe('Only Fans')
      expect(accounts).toHaveLength(1)
      return null
    })
})

test('delete account', () => {
  const scope = nock(/localhost/)
    .delete('/api/v1/accounts/1')
    .reply(200)

  return removeAccount(1)
    .then(() => {
      expect(scope.isDone()).toBe(true)
      return null
    })
})
