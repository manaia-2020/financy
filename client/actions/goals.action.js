export const ADD_GOAL = 'ADD_GOAL'
export const FETCH_GOALS_BEGIN = 'FETCH_GOALS_BEGIN'
export const FETCH_GOALS_SUCCESS = 'FETCH_GOALS_SUCCESS'
export const DELETE_GOAL = 'DELETE_GOAL'

export const addGoal = (goal) => ({
  type: ADD_GOAL,
  payload: { goal }
})

export const fetchGoalsBegin = () => ({
  type: FETCH_GOALS_BEGIN
})

export const fetchGoalsSuccess = (goals) => ({
  type: FETCH_GOALS_SUCCESS,
  payload: { goals }
})

export const deleteGoal = (id) => ({
  type: DELETE_GOAL,
  payload: { id }
})
