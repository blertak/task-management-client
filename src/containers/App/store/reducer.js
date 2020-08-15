import { APP_CLEAR_AUTH, APP_MAKE_AUTH } from './constants'

const storageUser = window.localStorage.getItem('user')
const storageToken = window.localStorage.getItem('token')
const storageTokenType = window.localStorage.getItem('token-type')

const initialState = {
  user: storageUser ? JSON.parse(storageUser) : null,
  token: storageToken || null,
  tokenType: storageTokenType || null
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case APP_MAKE_AUTH:
      return {
        ...state,
        user: action.value.user,
        token: action.value.token,
        tokenType: action.value.tokenType
      }
    case APP_CLEAR_AUTH:
      return {
        ...state,
        user: null,
        token: null,
        tokenType: null
      }
    default:
      return state
  }
}

export default app
