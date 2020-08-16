import { SET_TASKS } from './constants'

const initialState = {
  entries: []
}

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        entries: action.value
      }
    default:
      return state
  }
}

export default tasks
