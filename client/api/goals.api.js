import request from 'superagent'

export async function postGoal (goal, id) {
  const res = await request
    .post('/api/v1/goals')
    .send({ ...goal, id })

  if (res.status === 201) return 'added successfully'
  throw new Error('DATABASE ERROR')
}

export async function getUserGoals (id) {
  const res = await request.get(`/api/v1/goals/${id}`)

  if (res.status === 201) return res.body
  throw new Error('DATABASE ERROR')
}
