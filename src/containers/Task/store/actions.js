import { SET_TASKS } from './constants'

export const setTasks = (entries) => {
  return (dispatch) => {
    dispatch({
      type: SET_TASKS,
      value: entries
    })
  }
}
