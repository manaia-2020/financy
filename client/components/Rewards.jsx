import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getRewardsApi } from '../api/rewards.api'
import { setRewards } from '../actions'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

const Rewards = ({ dispatch, userInfo, medals }) => {
  const { id } = userInfo
  useEffect(() => {
    if (id) {
      getRewardsApi(userInfo.id)
        .then(rewards => {
          dispatch(setRewards(rewards.medals))
          return null
        })
        .catch(err => console.log(err))
    }
  }, [userInfo])

  const useStyles = makeStyles((theme) => ({
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
    },
    title: {
      fontSize: 14
    },
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1)
      },
      width: '50%',
      margin: 'auto'
    },
    pos: {
      marginBottom: 12
    },
    headingMargin: {
      width: '50%',
      margin: 'auto',
      padding: '10px'
    }
  }))

  const noMedals = medals.length === 0

  const classes = useStyles()

  return (
    <>
      <div >
        <Typography className={classes.headingMargin} component="h1" variant="h4">
      Here are the medals you have been awarded
        </Typography>
        {noMedals ? <h2>No medals awarded</h2> : medals.map(medal => (
          <div key={medal.id}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {medal.name}
                </Typography>
                <div className={classes.root}>
                  <Avatar alt={medal.id} src={medal.image}/>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  userInfo: state.addUserInfo,
  medals: state.rewards
})

export default connect(mapStateToProps)(Rewards)
