import request from 'superagent'

export const postExpense = (expenses) => {
  return request(expenses)
    .then(res => res.body)
}
