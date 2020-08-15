import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

// Components
import Navigation from '../../components/Navbars/Navigation'
import Register from '../register/Register'
import Login from '../login/Login'
import Task from '../Task/Task'
import Users from '../Users/Users'

class App extends Component {
  render () {
    return (
      <div>
        <Router>
          <Navigation />
          <div className='container'>
            <Switch>
              <Route path='/register' exact component={Register} />
              <Route path='/login' exact component={Login} />
              <Route path='/' exact component={Login} />
              <Route path='/task' exact component={Task} />
              <Route path='/users' exact component={Users} />
              <Redirect from='*' to='/error/404' />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
