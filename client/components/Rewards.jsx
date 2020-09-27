import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getRewardsApi } from '../api/rewards.api'
import { setRewards } from '../actions'

const Rewards = ({ dispatch, userInfo, medals }) => {
  useEffect(() => {
    getRewardsApi(userInfo.id)
      .then(rewards => {
        dispatch(setRewards(rewards.medals))
        return null
      })
      .catch(err => console.log(err))
  }, [])

  const noMedals = medals.length === 0
  return (
    <div>
      <h1>Rewards</h1>
      {noMedals ? 'No medals awarded' : medals.map(medal => <li key = {medal.id}>{medal.name}<img src={medal.image} /></li>)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  userInfo: state.addUserInfo,
  medals: state.setRewards
})

export default connect(mapStateToProps)(Rewards)
