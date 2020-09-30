import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getRewardsApi } from '../api/rewards.api'
import { setRewards } from '../actions'
import Content from './Dashboard/Content'

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

  const columns = ['name', 'image']
  const message = 'What you doing sis? you ain\'t got any rewards boo!'
  return <Content type="reward" columns={columns} rows={medals} message={message}/>
}

const mapStateToProps = (state) => ({
  userInfo: state.addUserInfo,
  medals: state.rewards
})

export default connect(mapStateToProps)(Rewards)
