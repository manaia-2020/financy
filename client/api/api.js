import request from 'superagent'

export const addTransaction = (expense, id) => {
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
