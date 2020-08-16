import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import UserService from '../../services/UserService'
import { clearAuthStorage } from '../../helpers/util'

// Redux functionality
import allActions from '../../store/actions'

// Components
import SimpleTable from '../../components/Tables/SimpleTable'
import CostumizedModal from '../../components/Modals/CostumizedModal/CostumizedModal'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10%'
  },
  addTask: {
    background: '#f50057',
    marginBottom: '1rem',
    color: 'white',
    marginLeft: '1rem',
    '&:hover': {
      boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
      background: '#d3004b'
    }
  },
  TextField: {
    width: '100%',
    marginTop: '1rem'
  },
  heading: {
    textTransform: 'uppercase',
    fontWeight: 'normal'
  },
  HeaderContainer: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  DateFilter: {
    background: 'white',
    borderRadius: '5px',
    margin: '0 1rem',
    '& .MuiOutlinedInput-input': {
      padding: '9px 14px !important'
    }
  },
  filterText: {
    display: 'inline-block',
    paddingTop: '9px'
  },
  applyFilter: {
    background: '#f4c307',
    marginBottom: '1rem',
    color: 'white',
    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
    width: '50%',
    maxWidth: '190px',
    '&:hover': {
      boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
      background: '#f4b306'
    }
  }
}))

const userService = new UserService()

function Users () {
  const cols = ['Id', 'Email', 'Role']
  const fields = ['_id', 'email', 'role']
  const classes = useStyles()

  // Modal state
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('user')
  const [googleId, setGoogleId] = useState('')
  const [githubId, setGithubId] = useState('')
  const [mode, setModalMode] = useState('create')

  const appState = useSelector(state => state.app)
  const usersState = useSelector(state => state.users)
  const dispatch = useDispatch()

  const prepRequest = () => {
    userService.setToken(appState.token, appState.tokenType)
  }

  useEffect(() => {
    const tokenExpire = +window.localStorage.getItem('token-expire')
    if (Date.now() > tokenExpire) {
      clearAuthStorage()
      allActions.app.clearAuth()(dispatch)
      return
    }

    (async () => {
      try {
        prepRequest()
        const res = await userService.listUsers()
        allActions.users.setUsers(res)(dispatch)
      } catch (err) {
        window.alert(err.message || 'Server Error')
        if (err.message === 'ERR_AUTH_TOKEN_EXPIRED') {
          clearAuthStorage()
          allActions.app.clearAuth()(dispatch)
        }
      }
    })()
  }, [appState, dispatch])

  const clearModalFields = () => {
    setId('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setRole('user')
    setGoogleId('')
    setGithubId('')
  }

  const handleOpenEdit = ({ _id, email, role, googleId, githubId }) => {
    setId(_id)
    setEmail(email)
    setPassword('')
    setRole(role)
    setGoogleId(googleId)
    setGithubId(githubId)
    setModalMode('edit')
    setOpen(true)
  }

  const handleOpenCreate = () => {
    clearModalFields()
    setModalMode('create')
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmitModal = async (e) => {
    e.preventDefault()

    try {
      if (mode === 'create') {
        await createUser()
      } else {
        await updateUser()
      }
      handleClose()
    } catch (err) {
      window.alert(err.message || 'Server error')
      if (err.message === 'ERR_AUTH_TOKEN_EXPIRED') {
        clearAuthStorage()
        allActions.app.clearAuth()(dispatch)
      }
    }
  }

  const updateUser = async () => {
    if (!email) throw new Error('ERR_EMAIL_REQUIRED')
    if (!role) throw new Error('ERR_ROLE_REQUIRED')

    prepRequest()
    const user = await userService.updateUser(id, email, role)
    const idx = usersState.entries.findIndex(u => u._id === user._id)
    if (idx >= 0) {
      usersState.entries[idx] = user
      allActions.users.setUsers(usersState.entries)(dispatch)
    }
  }

  const createUser = async () => {
    if (password !== confirmPassword) throw new Error('ERR_PASSWORDS_MISMATCH')
    if (!email) throw new Error('ERR_EMAIL_REQUIRED')
    if (!role) throw new Error('ERR_ROLE_REQUIRED')

    prepRequest()
    const user = await userService.createUser(email, password, role)
    usersState.entries.push(user)
    allActions.users.setUsers(usersState.entries)(dispatch)
  }

  const handleDelete = async ({ _id }) => {
    try {
      const dialogRes = window.confirm('Are you sure that you want to delete this entry?')
      if (!dialogRes) return

      prepRequest()
      await userService.deleteUser(_id)
      usersState.entries = usersState.entries.filter(u => u._id !== _id)
      allActions.users.setUsers(usersState.entries)(dispatch)
    } catch (err) {
      window.alert(err.message || 'Server error')
      if (err.message === 'ERR_AUTH_TOKEN_EXPIRED') {
        clearAuthStorage()
        allActions.app.clearAuth()(dispatch)
      }
    }
  }

  return (
    <>
      <Container className={classes.root}>
        <div className={classes.HeaderContainer}>
          <Button
            className={classes.addTask}
            onClick={handleOpenCreate}
          >
            Add user
          </Button>
        </div>
        <CostumizedModal
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmitModal}
          submitText={mode === 'create' ? 'Add user' : 'Edit user'}
        >
          <div>
            <h2 className={classes.heading}>{mode === 'create' ? 'Add new user' : 'Edit user'}</h2>
            <form className={classes.root} noValidate autoComplete='off'>
              <input type='hidden' value={id} />
              <TextField
                className={classes.TextField}
                disabled={!!(githubId || googleId)}
                label='Email' variant='outlined'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {mode === 'create' && (
                <TextField
                  className={classes.TextField}
                  label='Password' variant='outlined'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />)}
              {mode === 'create' && (
                <TextField
                  className={classes.TextField}
                  label='Confirm password' variant='outlined'
                  type='password'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />)}
              <FormControl variant='outlined' className={classes.TextField}>
                <InputLabel id='demo-simple-select-outlined-label'>Role</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Role'
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='user'>User</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
        </CostumizedModal>
        <SimpleTable
          modalHeading='Edit user'
          rows={usersState.entries}
          fields={fields}
          cols={cols}
          editHandle={handleOpenEdit}
          deleteHandle={handleDelete}
        />
      </Container>
    </>
  )
}

export default Users
