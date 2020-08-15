import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'

// Redux functionality
import * as appActions from './store/actions'

// Components
import Navigation from '../../components/Navbars/Navigation'
import Register from '../Register/Register'
import Login from '../Login/Login'
import LoginOAuth from '../Login/LoginOAuth'
import Logout from '../Logout/Logout'
import Task from '../Task/Task'
import Users from '../Users/Users'
import RedirectIfAuthorized from '../../components/Routes/RedirectIfAuthorized'
import RedirectUnauthorized from '../../components/Routes/RedirectUnauthorized'

class App extends Component {
  render () {
    const isAuth = !!this.props.app.user
    const role = isAuth ? this.props.app.user.role : ''

    return (
      <div>
        <Router>
          <Navigation isAuth={isAuth} role={role} />
          <div className='container'>
            <Switch>
              <RedirectIfAuthorized
                path='/register' exact
                redirectTo='/tasks'
                isAuth={isAuth}
                {...this.props}
                component={Register}
              />
              <RedirectIfAuthorized
                path='/login/oauth'
                redirectTo='/tasks'
                isAuth={isAuth}
                {...this.props}
                component={LoginOAuth}
              />
              <RedirectIfAuthorized
                path='/login' exact
                redirectTo='/tasks'
                isAuth={isAuth}
                {...this.props}
                component={Login}
              />
              <RedirectUnauthorized
                path='/logout' exact
                redirectTo='/login'
                isAuth={isAuth}
                {...this.props}
                component={Logout}
              />
              <RedirectUnauthorized
                path='/tasks' exact
                redirectTo='/login'
                isAuth={isAuth}
                {...this.props}
                component={Task}
              />
              <RedirectUnauthorized
                path='/users' exact
                redirectTo='/login'
                isAuth={isAuth}
                {...this.props}
                component={Users}
              />
              <Redirect path='/' exact to='/tasks' />
              <Redirect from='*' to='/error/404' />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (app) => ({ ...app })

export default connect(mapStateToProps, appActions)(App)
