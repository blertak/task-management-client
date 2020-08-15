import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Button, TextField } from '@material-ui/core'

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

function createData (taskName, date, duration) {
  return { taskName, date, duration }
}

const rows = [
  createData('some task name', '10.10.2020', '10h'),
  createData('some task name', '10.10.2020', '10h'),
  createData('some task name', '10.10.2020', '10h'),
  createData('some task name', '10.10.2020', '10h'),
  createData('some task name', '10.10.2020', '10h')
]

const cols = ['Name', 'Date', 'Duration']

function Task () {
  const classes = useStyles()
  console.log('rows', rows)
  const [open, setOpen] = React.useState(false)

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
            Add task
          </Button>
          <Button
            className={classes.applyFilter}
            onClick={() => handleOpen()}
          >
            Apply filters
          </Button>
          <form>
            <span className={classes.filterText}>from:</span>
            <TextField
              className={classes.DateFilter}
              variant='outlined'
              type='date'
            />
            <span>to:</span>
            <TextField
              className={classes.DateFilter}
              variant='outlined'
              type='date'
            />
          </form>
        </div>
        <CostumizedModal
          handleOpen={handleOpen}
          open={open}
          handleClose={handleClose}
          handleSubmit={() => { }}
          submitText='Add task'
        >
          <div>
            <h2 className={classes.heading}>Add new task</h2>
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
          </div>
        </CostumizedModal>
        <SimpleTable
          modalHeading='Edit task'
          rows={rows}
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

export default Task
