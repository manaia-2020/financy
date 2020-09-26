import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchGoalsBegin, fetchGoalsFailure, fetchGoalsSuccess } from '../actions/goals.action'
import { getUserGoals } from '../api/goals.api'
import AddGoal from './AddGoal'

function Goals (props) {
  const { begin, success, failure, goals, userInfo } = props

  useEffect(() => {
    begin()
    console.log(userInfo)
    getUserGoals(userInfo.id)
      .then((goals) => success(goals))
      .catch((error) => failure(error))
  }, [])

  return (
    <>
      {goals.map((goal) => (
        <h1 key={goal.id}>{ goal.name }</h1>
      ))}
      <AddGoal />
    </>
  )
}

const mapStateToProps = (state) => ({
  goals: state.goals,
  waiting: state.waiting,
  userInfo: state.addUserInfo
})

const mapDispatchToProps = (dispatch) => ({
  begin: () => dispatch(fetchGoalsBegin()),
  success: (goals) => dispatch(fetchGoalsSuccess(goals)),
  failure: (error) => dispatch(fetchGoalsFailure(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(Goals)
