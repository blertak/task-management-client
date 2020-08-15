/**
 * @param {Error} err
 */
export const axiosError = (err) => {
  let message = err.message
  if (err.response && err.response.data && err.response.data.message) {
    message = err.response.data.message
  }
  return new Error(message)
}

/**
 * @param {string} authToken
 * @param {'jwt'|'oauth2.0'} tokenType
 */
export const axiosHeaders = (authToken, tokenType) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  if (tokenType === 'jwt') headers.Authorization = `Bearer ${authToken}`
  if (tokenType === 'oauth2.0') headers['X-OAUTH-TOKEN'] = authToken
  return headers
}

export const clearAuthStorage = () => {
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('token-expire')
  window.localStorage.removeItem('token-type')
}
