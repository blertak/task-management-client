import { SET_USERS } from './constants'

export const setUsers = (entries) => {
  return (dispatch) => {
    dispatch({
      type: SET_USERS,
      value: entries
    })
  }
}
