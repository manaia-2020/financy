import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchGoalsBegin, fetchGoalsSuccess } from '../actions/goals.action'
import { getUserGoals } from '../api/goals.api'
import { formatAmount } from '../utils/currency'
import AddGoal from './AddGoal'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

function Goals (props) {
  const { begin, success, goals, userInfo } = props

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
                <Typography>
                  Date:{goal.goal_date}, Amount: {formatAmount(goal.amount)}
                </Typography>
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
  success: (goals) => dispatch(fetchGoalsSuccess(goals))
})

export default connect(mapStateToProps, mapDispatchToProps)(Goals)
