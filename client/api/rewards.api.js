import request from 'superagent'

export function getRewardsApi (id) {
  return request
  // TODO REMOVE 7 accountID
    .get(`/api/v1/medals/${id}/7/show`)
    .then(res => {
      return res.body
    })
}
