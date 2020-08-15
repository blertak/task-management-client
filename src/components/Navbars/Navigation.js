import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Container } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
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

function Navigation () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.AppBar}>
        <Toolbar>
          <Container>
            <Link
              className={classes.navLink}
              to='/login'
            >
              <PersonIcon fontSize='small' />
              <span className={classes.ButtonText}>Login</span>
            </Link>
            <Link
              className={classes.navLink}
              to='/register'
            >
              <PersonAddIcon fontSize='small' />
              <span className={classes.ButtonText}>Register</span>
            </Link>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(Navigation)
