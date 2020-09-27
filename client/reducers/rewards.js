import { SET_REWARDS } from '../actions'

const initialState = []

function setRewards(state = initialState, action){
    switch(action.type){
        case SET_REWARDS:
            return action.rewards
        default:
            return state
    }
}


export default setRewards