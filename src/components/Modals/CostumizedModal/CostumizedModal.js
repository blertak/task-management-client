import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button } from '@material-ui/core'

function getModalStyle () {
  const top = 50
  const left = 50
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    padding: '2rem'
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  },
  addButton: {
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
  cancelButton: {
    background: '#f50057',
    marginBottom: '1rem',
    color: 'white',
    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
    width: '50%',
    maxWidth: '190px',
    '&:hover': {
      boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
      background: '#d3004b'
    }
  },
  modalActionContainer: {
    marginTop: ' 25px',
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

function CostumizedModal (props) {
  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {props.children}
      <div className={classes.modalActionContainer}>
        <Button className={classes.addButton} onClick={props.handleSubmit}>{props.submitText}</Button>
        <Button className={classes.cancelButton} onClick={props.handleClose}>Cancel</Button>
      </div>
    </div>
  )

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  )
}

export default CostumizedModal
