import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import AuthService from '../../services/AuthService'

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

function Register () {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [comfirmPwd, setComfirmPwd] = useState('')

  const dispatch = useDispatch()

  const submitRegister = async (e) => {
    e.preventDefault()

    try {
      if (comfirmPwd === password) {
        const { token, expire } = await authService.register(email, password)
        const user = await authService.getUserInfo(token, 'jwt')

        window.localStorage.setItem('user', JSON.stringify(user))
        window.localStorage.setItem('token', token)
        window.localStorage.setItem('token-type', 'jwt')

        const expireDate = Date.now() + expire * 1000 - 30000 // 30000ms network latency
        window.localStorage.setItem('token-expire', expireDate)

        allActions.app.makeAuth({ user, token, tokenType: 'jwt' })(dispatch)
      } else {
        window.alert('password and cmfirm password must match')
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
            Register
          </Typography>
          <form className={classes.form} autoComplete='off'>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              inputProps={{
                autocomplete: 'email',
                form: {
                  autocomplete: 'off'
                }
              }}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
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
              onClick={submitRegister}
            >
              Register
            </Button>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Register
