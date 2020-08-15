import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Container } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import GroupIcon from '@material-ui/icons/Group'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { Link, withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  navLink: {
    fontSize: '1.2rem',
    padding: '25px',
    color: '#fff',
    textTransform: 'uppercase',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      borderRadius: '5px'
    }
  },
  ButtonText: {
    paddingLeft: '0.5rem'
  },
  AppBar: {
    background: 'transparent',
    boxShadow: 'none',
    textAlign: 'center'
  }
}))

function Navigation (props) {
  const classes = useStyles()

  const links = []
  if (!props.isAuth) {
    links.push(
      <Link key='login' className={classes.navLink} to='/login'>
        <PersonIcon fontSize='small' />
        <span className={classes.ButtonText}>Login</span>
      </Link>
    )
    links.push(
      <Link key='register' className={classes.navLink} to='/register'>
        <PersonAddIcon fontSize='small' />
        <span className={classes.ButtonText}>Register</span>
      </Link>
    )
  }

  if (props.isAuth && props.role === 'admin') {
    links.push(
      <Link key='users' className={classes.navLink} to='/users'>
        <GroupIcon fontSize='small' />
        <span className={classes.ButtonText}>Users</span>
      </Link>
    )
  }

  if (props.isAuth) {
    links.push(
      <Link key='tasks' className={classes.navLink} to='/tasks'>
        <AssignmentIcon fontSize='small' />
        <span className={classes.ButtonText}>Tasks</span>
      </Link>
    )
    links.push(
      <Link key='logout' className={classes.navLink} to='/logout'>
        <ExitToAppIcon fontSize='small' />
        <span className={classes.ButtonText}>Logout</span>
      </Link>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.AppBar}>
        <Toolbar>
          <Container>
            {links.map(x => x)}
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(Navigation)
