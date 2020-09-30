import request from 'superagent'
import { getAuthorizationHeader } from 'authenticare/client'

const url = '/api/v1/goals'
const acceptJsonHeader = { Accept: 'application/json' }

export async function postGoal (goal, id) {
  const res = await request
    .post('/api/v1/goals')
    .send({ ...goal, id })

  if (res.status === 201) return res.body
  throw new Error('DATABASE ERROR')
}

export async function getUserGoals (id) {
  const res = await request.get(`/api/v1/goals/${id}`)

  if (res.status === 201) return res.body
  throw new Error('DATABASE ERROR')
}

export async function deleteGoalById (id) {
  const res = await request.delete(url)
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .send({ id })

  if (res.status === 201) return res.body
  throw new Error('DATABASE ERROR')
}
