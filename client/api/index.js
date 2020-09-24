import request from 'superagent'

export function getAccounts(id) {
  return request
    .get(`api/v1/accounts/${id}`)
    .then(response => response.body)
}