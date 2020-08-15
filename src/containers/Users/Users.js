import React, { useEffect } from 'react'
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
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const appState = useSelector(state => state.app)
  const usersState = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userService.httpClient) {
      userService.setToken(appState.token, appState.tokenType)
    }

    const tokenExpire = +window.localStorage.getItem('token-expire')
    if (Date.now() > tokenExpire) {
      clearAuthStorage()
      allActions.app.clearAuth()(dispatch)
      return
    }

    (async () => {
      try {
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

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Container className={classes.root}>
        <div className={classes.HeaderContainer}>
          <Button
            className={classes.addTask}
            onClick={() => handleOpen()}
          >
            Add user
          </Button>
        </div>
        <CostumizedModal
          handleOpen={handleOpen}
          open={open}
          handleClose={handleClose}
          handleSubmit={() => { }}
          submitText='Add user'
        >
          <div>
            <h2 className={classes.heading}>Add new user</h2>
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField
                className={classes.TextField}
                label='Email' variant='outlined'
              />
              <TextField
                className={classes.TextField}
                label='Password' variant='outlined'
                type='password'
              />
              <FormControl variant='outlined' className={classes.TextField}>
                <InputLabel id='demo-simple-select-outlined-label'>Role</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Role'
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
          cols={cols}
        >
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField
              className={classes.TextField}
              label='Task name' variant='outlined'
            />
            <TextField
              className={classes.TextField}
              variant='outlined'
              type='date'
            />
            <TextField
              className={classes.TextField}
              label='Duration' variant='outlined'
              type='number'
              InputProps={{ inputProps: { min: 0 } }}
            />
          </form>
        </SimpleTable>
      </Container>
    </>
  )
}

export default Users
