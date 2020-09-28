import request from 'superagent'
import { getAuthorizationHeader } from 'authenticare/client'

export const addRecurringTransaction = (expense, id) => {
  return request
    .post(`/api/v1/bank/${id}/addTransaction`)
    .send(expense)
    .then(res => res.body)
}

export function getAccountApi (id) {
  return request
    .get(`/api/v1/accounts/${id}`)
    .then(response => response.body)
}

export function postAccount (id, account) {
  return request
    .post(`/api/v1/accounts/${id}`)
    .send(account)
    .then(response => response.body)
}

export function removeAccount (id) {
  return request
    .del(`/api/v1/accounts/${id}`)
    .then(response => response)
}

export function getUserInfo (email) {
  return request
    .get(`/api/v1/auth?email=${email}`)
    .then(res => {
      return res.body
    })
}

export function getUserAccountTransactions (userId, accountId) {
  return request
    .get(`/api/v1/transactions/${userId}/${accountId}`)
    .then(res => res.body)
}

export function addNewTransaction (userId, object) {
  return request
    .post(`/api/v1/bank/${userId}/addTransaction`)
    .send(object)
    .then(res => res.body)
}

export function getBalance (accountId) {
  return request
    .get(`/api/v1/bank/balance/${accountId}`)
    .then(res => res.body)
}

export async function getUser () {
  const res = await request
    .get('/api/v1/user')
    .set({ Accept: 'application/json' })
    .set(getAuthorizationHeader())

  if (res.status === 200) return res.body
  throw new Error('unable to retrieve user')
}
