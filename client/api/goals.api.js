import request from 'superagent'

export async function postGoal (goal, id) {
  const res = await request
    .post('/api/v1/goals')
    .send({ ...goal, id })

  if (res.status === 201) return 'added successfully'
  throw new Error('DATABASE ERROR')
}
