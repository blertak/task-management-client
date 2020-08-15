import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// Redux functionality
import allActions from '../../store/actions'

function Logout () {
  const dispatch = useDispatch()

  useEffect(() => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('token-expire')
    window.localStorage.removeItem('token-type')

    allActions.app.appClearAuth()(dispatch)
  }, [dispatch])

  return <div />
}

export default Logout
