import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

// assets
import githubIcon from '../../assets/images/icons/github.svg'
import googleIcon from '../../assets/images/icons/google.svg'

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
  login: {
    margin: theme.spacing(3, 0, 2),
    background: '#f50057',
    '&:hover': {
      background: '#d3004b'
    }
  },
  socialLoginContainer: {
    marginTop: ' 25px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  socialLogin: {
    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
    width: '45%',
    maxWidth: '140px'
  },
  imgIcon: {
    width: '25px',
    paddingRight: '10px'
  }
}))

function Register () {
  const classes = useStyles()

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
              autoComplete='email'
              autoFocus
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
              autoComplete='current-password'
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
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.login}
            >
              Log In
            </Button>
            <div className={classes.socialLoginContainer}>
              <Button
                className={classes.socialLogin}
                color='default'
                href='#pablo'
                onClick={e => e.preventDefault()}
              >
                <span className='btn-inner--icon'>
                  <img
                    alt='...'
                    src={githubIcon}
                    className={classes.imgIcon}
                  />
                </span>
                <span className='btn-inner--text'>Github</span>
              </Button>
              <Button
                className={classes.socialLogin}
                color='default'
                href='#pablo'
                onClick={e => e.preventDefault()}
              >
                <span className='btn-inner--icon'>
                  <img
                    alt='...'
                    src={googleIcon}
                    className={classes.imgIcon}
                  />
                </span>
                <span className='btn-inner--text'>Google</span>
              </Button>

            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Register
