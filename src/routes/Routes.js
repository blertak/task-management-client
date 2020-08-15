import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

// Containers
import App from '../containers/App'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' component={App} />
        <Redirect from='*' to='/error/404' />
      </Switch>
    </Router>
  )
}

export default Routes
