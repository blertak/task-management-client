import React from 'react'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  actionButton: {
    borderRadius: '50px'
  },
  TextField: {
    width: '100%',
    marginTop: '1rem'
  },
  heading: {
    textTransform: 'uppercase',
    fontWeight: 'normal'
  }
})

function SimpleTable (props) {
  const classes = useStyles()

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='caption table'>
          <TableHead>
            <TableRow>
              {props.cols.map((col, i) => (
                <TableCell key={i} component='th'>{col}</TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row, i) => (
              <TableRow key={i}>
                {_.map(_.pick(row, props.fields), (val, key) => <TableCell key={key} component='td' scope='row'>{val}</TableCell>)}
                <TableCell align='right'>
                  <Button
                    className={classes.actionButton}
                    onClick={() => props.editHandle(row)}
                  >
                    <EditIcon fontSize='small' />
                  </Button>
                  <Button
                    className={classes.actionButton}
                    onClick={() => props.deleteHandle(row)}
                  >
                    <DeleteIcon fontSize='small' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default SimpleTable
