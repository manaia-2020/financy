import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Refresh'
import DeleteIcon from '@material-ui/icons/Delete'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Modal from '@material-ui/core/Modal'
import Select from '@material-ui/core/Select'
import { formatAmount } from '../../utils/currency'
import { MenuItem } from '@material-ui/core'

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden'
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: 'block'
  },
  add: {
    marginRight: theme.spacing(1)
  },
  contentWrapper: {
    margin: '40px 16px'
  },
  table: {
    minWidth: 650
  }
})

function Content (props) {
  const { type, columns, rows, classes, handleDelete, modal, accounts, handleChange, message } = props
  const [open, setOpen] = React.useState(false)
  const [filterText, setFilterText] = React.useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const filteredItems = rows.filter(
    item =>
      item.name.toLocaleLowerCase().includes(filterText)
  )

  const rowsToDisplay = filterText ? filteredItems : rows

  const money = ['balance', 'amount']
  const date = ['goal_date', 'date']

  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by name"
                onChange={e => setFilterText(e.target.value.toLocaleLowerCase())}
                value={filterText}
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput
                }}
              />
            </Grid>
            <Grid item>
              {type === 'transaction' && (
                <Select
                  labelId="accountSelect"
                  id="accountSelect"
                  onChange={handleChange}
                  name="12"
                  style={{ marginRight: 25 }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {accounts.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              <Button variant="contained" onClick={handleOpen} className={classes.add}>add {type}</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {modal}
              </Modal>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {rowsToDisplay.length ? (
          <>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => index < 1 ? (
                      <TableCell key={column}>{column}</TableCell>
                    ) : (
                      <TableCell align="right" key={column}>
                        {column !== 'delete' ? column : ''}
                      </TableCell>)
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsToDisplay.map((row) => (
                    <TableRow key={row.id}>
                      {columns.map((column, index) => index < 1 ? (
                        <TableCell key={column} component="th" scope="row">{row[column]}</TableCell>
                      ) : (
                        <TableCell key={column} align="right">
                          {column !== 'delete' ? money.includes(column) || date.includes(column) ? money.includes(column) ? formatAmount(row[column]) : new Date(row[column]).toLocaleDateString() : row[column] : (
                            <Button
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDelete(row.id)}
                            >Delete</Button>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          filterText ? (
            <Typography color="textSecondary" align="center">
              There are no items by that name!
            </Typography>
          ) : (
            <Typography color="textSecondary" align="center">
              {message}
            </Typography>
          ))}
      </div>
    </Paper>
  )
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    accounts: state.accounts,
    userInfo: state.addUserInfo
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Content))
