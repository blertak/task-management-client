import { SET_USERS } from './constants'

const initialState = {
  entries: []
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        entries: action.value
      }
    default:
      return state
  }
}

export default users
