import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import Container from '@material-ui/core/Container'
import AuthService from '../../services/AuthService'

// Helpers
import { clearAuthStorage } from '../../helpers/util'

// Redux functionality
import allActions from '../../store/actions'

const authService = new AuthService()

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    padding: '2rem'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  register: {
    margin: theme.spacing(3, 0, 2),
    background: '#f50057',
    '&:hover': {
      background: '#d3004b'
    }
  }
}))

function ResetPassword () {
  const classes = useStyles()
  const [password, setPassword] = useState('')
  const [comfirmPwd, setComfirmPwd] = useState('')

  const dispatch = useDispatch()
  const appState = useSelector(state => state.app)

  const submitResetPassword = async (e) => {
    e.preventDefault()

    try {
      if (comfirmPwd === password) {
        await authService.resetPassword(appState.token, password)
        clearAuthStorage()
        allActions.app.clearAuth()(dispatch)
      } else {
        window.alert('password and comfirm password must match')
      }
    } catch (err) {
      window.alert(err.message || 'Invalid credentials')
    }
  }

  return (
    <div className='App'>
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Reset Password
          </Typography>
          <form className={classes.form} autoComplete='off'>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Confirm Password'
              type='password'
              id='password'
              onChange={(e) => setComfirmPwd(e.target.value)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.register}
              onClick={submitResetPassword}
            >
              Reset Password
            </Button>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default ResetPassword
