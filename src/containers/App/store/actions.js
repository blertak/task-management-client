import { APP_CLEAR_AUTH, APP_MAKE_AUTH } from './constants'

export const appMakeAuth = ({ user, token, tokenType }) => {
  return (dispatch) => {
    dispatch({
      type: APP_MAKE_AUTH,
      value: { user, token, tokenType }
    })
  }
}

export const appClearAuth = () => {
  return (dispatch) => {
    dispatch({
      type: APP_CLEAR_AUTH
    })
  }
}
