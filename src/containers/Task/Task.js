import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Button, TextField } from '@material-ui/core'
import TaskService from '../../services/TaskService'
import { clearAuthStorage } from '../../helpers/util'

// Redux functionality
import allActions from '../../store/actions'

// Components
import SimpleTable from '../../components/Tables/SimpleTable'
import CostumizedModal from '../../components/Modals/CostumizedModal/CostumizedModal'

const taskService = new TaskService()

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
    paddingTop: '9px',
    textTransform: 'uppercase',
    color: 'white'
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
  },
  exportCSV: {
    background: '#32be7d',
    marginBottom: '1rem',
    marginRight: '1rem',
    color: 'white',
    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
    width: '50%',
    maxWidth: '190px',
    '&:hover': {
      boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
      background: '#219e61'
    }
  }
}))

function Task () {
  const cols = ['Name', 'Date', 'Duration']
  const fields = ['taskName', 'date', 'duration']
  const classes = useStyles()

  // Filter state
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  // Modal state
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')
  const [uid, setUid] = useState('')
  const [taskName, setTaskName] = useState('')
  const [date, setDate] = useState('')
  const [duration, setDuration] = useState('')
  const [mode, setModalMode] = useState('create')

  const dispatch = useDispatch()

  const appState = useSelector(state => state.app)
  const tasksState = useSelector(state => state.tasks)

  const prepRequest = () => {
    taskService.setToken(appState.token, appState.tokenType)
  }

  useEffect(() => {
    const tokenExpire = +window.localStorage.getItem('token-expire')
    if (Date.now() > tokenExpire) {
      clearAuthStorage()
      allActions.app.clearAuth()(dispatch)
      return
    }

    listTasks()
  }, [appState, dispatch])

  const listTasks = async () => {
    try {
      prepRequest()
      const res = await taskService.listTasks(from, to)
      allActions.tasks.setTasks(res)(dispatch)
    } catch (err) {
      window.alert(err.message || 'Server Error')
      if (err.message === 'ERR_AUTH_TOKEN_EXPIRED') {
        clearAuthStorage()
        allActions.app.clearAuth()(dispatch)
      }
    }
  }

  const exportTasks = async () => {
    try {
      prepRequest()
      await taskService.exportTasks(from, to)
    } catch (err) {
      window.alert(err.message || 'Server Error')
      if (err.message === 'ERR_AUTH_TOKEN_EXPIRED') {
        clearAuthStorage()
        allActions.app.clearAuth()(dispatch)
      }
    }
  }

  const clearModalFields = () => {
    setId('')
    setUid('')
    setTaskName('')
    setDate('')
    setDuration('')
  }

  const handleOpenEdit = ({ _id, uid, taskName, date, duration }) => {
    setId(_id)
    setUid(uid)
    setTaskName(taskName)
    setDate(date)
    setDuration(duration)
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
        await createTask()
      } else {
        await updateTask()
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

  const createTask = async () => {
    if (!taskName) throw new Error('ERR_TASK_NAME_REQUIRED')
    if (!date) throw new Error('ERR_DATE_REQUIRED')
    if (!duration) throw new Error('ERR_DURATION_REQUIRED')

    prepRequest()
    const task = await taskService.createTask(taskName, date, duration)
    tasksState.entries.push(task)
    allActions.tasks.setTasks(tasksState.entries)(dispatch)
  }

  const updateTask = async () => {
    if (!taskName) throw new Error('ERR_TASK_NAME_REQUIRED')
    if (!date) throw new Error('ERR_DATE_REQUIRED')
    if (!duration) throw new Error('ERR_DURATION_REQUIRED')
    prepRequest()
    const task = await taskService.updateTask(id, taskName, date, duration)
    const idx = tasksState.entries.findIndex(t => t._id === task._id)
    if (idx >= 0) {
      tasksState.entries[idx] = task
      allActions.tasks.setTasks(tasksState.entries)(dispatch)
    }
  }

  const handleDelete = async ({ _id }) => {
    try {
      const dialogRes = window.confirm('Are you sure that you want to delete this entry?')
      if (!dialogRes) return

      prepRequest()
      await taskService.deleteTask(_id)
      tasksState.entries = tasksState.entries.filter(t => t._id !== _id)
      allActions.tasks.setTasks(tasksState.entries)(dispatch)
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
            Add task
          </Button>
          <Button
            className={classes.applyFilter}
            onClick={listTasks}
          >
            Apply filters
          </Button>
          <Button
            className={classes.exportCSV}
            onClick={exportTasks}
          >
            CSV export
          </Button>
          <form>
            <span className={classes.filterText}>from:</span>
            <TextField
              className={classes.DateFilter}
              variant='outlined'
              type='date'
              value={from}
              onChange={e => setFrom(e.target.value)}
            />
            <span className={classes.filterText}>to:</span>
            <TextField
              className={classes.DateFilter}
              variant='outlined'
              type='date'
              value={to}
              onChange={e => setTo(e.target.value)}
            />
          </form>
        </div>
        <CostumizedModal
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmitModal}
          submitText={mode === 'create' ? 'Add task' : 'Edit task'}
        >
          <div>
            <h2 className={classes.heading}>{mode === 'create' ? 'Add new task' : 'Edit task'}</h2>
            <form className={classes.root} noValidate autoComplete='off'>
              {mode === 'edit' && (
                <TextField
                  className={classes.TextField}
                  label='User' variant='outlined'
                  value={uid}
                  disabled
                />)}
              <TextField
                className={classes.TextField}
                label='Task name' variant='outlined'
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <TextField
                className={classes.TextField}
                variant='outlined'
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <TextField
                className={classes.TextField}
                label='Duration' variant='outlined'
                type='number'
                InputProps={{ inputProps: { min: 0 } }}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </form>
          </div>
        </CostumizedModal>
        <SimpleTable
          modalHeading='Edit task'
          rows={tasksState.entries}
          cols={cols}
          fields={fields}
          editHandle={handleOpenEdit}
          deleteHandle={handleDelete}
        />
      </Container>
    </>
  )
}

export default Task
