import request from 'superagent'

export const addRecurringTransaction = (expense, id) => {
  return request
    .post(`/api/v1/bank/${id}/addTransaction`)
    .send(expense)
    .then(res => res.body)
}

export function getAccountApi (id = 1) {
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
