export const ADD_GOAL = 'ADD_GOAL'

export const addGoal = (goal, id) => ({
  type: ADD_GOAL,
  payload: { goal, id }
})
