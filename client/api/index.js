import request from 'superagent'

export function getAccounts(id) {
  return request
    .get(`api/v1/accounts/${id}`)
    .then(response => response.body)
}

export function postAccount(id, account) {
  return request
    .post(`api/v1/accounts/${id}`)
    .send({ account })
    .then(response => response.body)
}