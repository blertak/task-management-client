import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearAuthStorage } from '../../helpers/util'

// Redux functionality
import allActions from '../../store/actions'

function Logout () {
  const dispatch = useDispatch()

  useEffect(() => {
    clearAuthStorage()
    allActions.app.clearAuth()(dispatch)
  }, [dispatch])

  return <div />
}

export default Logout
