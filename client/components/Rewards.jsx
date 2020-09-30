import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getRewardsApi } from '../api/rewards.api'
import { setRewards } from '../actions'

const Rewards = ({ dispatch, userInfo, medals }) => {
  const { id } = userInfo
  useEffect(() => {
    if(id){
      getRewardsApi(userInfo.id, accountIds)
        .then(rewards => {
          console.log(rewards)
          dispatch(setRewards(rewards.medals))
          return null
        })
        .catch(err => console.log(err))
    }
  }, [userInfo])

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
  medals: state.rewards,
})

export default connect(mapStateToProps)(Rewards)
