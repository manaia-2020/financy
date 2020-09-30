export const SET_MAIN_CONTENT = 'SET_MAIN_CONTENT'

export const setContent = (type) => {
  return {
    type: SET_MAIN_CONTENT,
    payload: { type }
  }
}
