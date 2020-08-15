import { CLEAR_AUTH, MAKE_AUTH } from './constants'

export const makeAuth = ({ user, token, tokenType }) => {
  return (dispatch) => {
    dispatch({
      type: MAKE_AUTH,
      value: { user, token, tokenType }
    })
  }
}

export const clearAuth = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_AUTH
    })
  }
}
