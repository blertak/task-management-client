import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const RedirectUnauthorized = ({ isAuth, component: Component, ...rest }) => (
  <Route
    render={props => isAuth ? (<Component {...rest} {...props} />) : (<Redirect to={{ pathname: rest.redirectTo }} />)}
  />
)

export default RedirectUnauthorized
