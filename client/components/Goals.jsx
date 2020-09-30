import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setContent } from '../actions/content.action'
import { fetchGoalsBegin, fetchGoalsSuccess, deleteGoal } from '../actions/goals.action'
import { getUserGoals, deleteGoalById } from '../api/goals.api'
import AddGoal from './AddGoal'
import Content from './Dashboard/Content'
function Goals (props) {
  const { begin, success, goals, userInfo, goalRemoved, setCon } = props

  useEffect(() => {
    if (userInfo.id) {
      begin()
      setCon('goals')
      getUserGoals(userInfo.id)
        .then((goals) => success(goals))
        .catch((error) => console.log(error))
    }
  }, [userInfo])

  function handleDelete (id) {
    deleteGoalById(id)
      .then(() => goalRemoved(id))
      .catch(console.log)
  }

  const columns = ['name', 'goal_date', 'amount', 'delete']
  return <Content type="goal" columns={columns} rows={goals} handleDelete={handleDelete} modal={<AddGoal />} />
}

const mapStateToProps = (state) => ({
  goals: state.goals,
  waiting: state.waiting,
  userInfo: state.addUserInfo
})

const mapDispatchToProps = (dispatch) => ({
  begin: () => dispatch(fetchGoalsBegin()),
  success: (goals) => dispatch(fetchGoalsSuccess(goals)),
  goalRemoved: (goal) => dispatch(deleteGoal(goal)),
  setCon: (type) => dispatch(setContent(type))
})

export default connect(mapStateToProps, mapDispatchToProps)(Goals)
