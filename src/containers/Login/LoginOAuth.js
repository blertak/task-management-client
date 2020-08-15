import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AuthService from '../../services/AuthService'

// Redux functionality
import allActions from '../../store/actions'

const authService = new AuthService()

function LoginOAuth () {
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const query = new URLSearchParams(window.location.search)
      const token = query.get('oauthToken')
      if (!token) return

      try {
        const expire = 3600
        const user = await authService.getUserInfo(token, 'oauth2.0')

        window.localStorage.setItem('user', JSON.stringify(user))
        window.localStorage.setItem('token', token)
        window.localStorage.setItem('token-type', 'oauth2.0')

        const expireDate = Date.now() + expire * 1000 - 30000 // 30000ms network latency
        window.localStorage.setItem('token-expire', expireDate)

        allActions.app.appMakeAuth({ user, token, tokenType: 'oauth2.0' })(dispatch)
      } catch (err) {
        window.alert(err.message || 'Server Error')
      }
    })()
  }, [dispatch])

  return <div />
}

export default LoginOAuth
