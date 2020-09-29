import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchGoalsBegin, fetchGoalsSuccess, deleteGoal } from '../actions/goals.action'
import { getUserGoals, deleteGoalById } from '../api/goals.api'
import { formatAmount } from '../utils/currency'
import AddGoal from './AddGoal'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

function Goals (props) {
  const { begin, success, goals, userInfo, goalRemoved } = props

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    }
  }))

  useEffect(() => {
    if (userInfo.id) {
      begin()
      getUserGoals(userInfo.id)
        .then((goals) => success(goals))
        .catch((error) => console.log(error))
    }
  }, [userInfo])

  function removeGoal (id) {
    deleteGoalById(id)
      .then(() => goalRemoved(id))
      .catch(console.log)
  }

  const classes = useStyles()
  return (
    <>
      <AddGoal />
      <div className={classes.root}>
        {goals.map((goal) => (
          <div key={goal.id}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>{goal.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ flex: 1 }}>
                  Date: {new Date(goal.goal_date).toLocaleDateString()}, Amount: {formatAmount(goal.amount)}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={() => removeGoal(goal.id)}
                >
                    Delete
                </Button>
              </AccordionDetails>
            </Accordion>
          </div>))}
      </div>
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
  goalRemoved: (goal) => dispatch(deleteGoal(goal))
})

export default connect(mapStateToProps, mapDispatchToProps)(Goals)
