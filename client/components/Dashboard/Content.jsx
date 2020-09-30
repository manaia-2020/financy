import React, { useEffect, useState } from 'react'
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
import { getAccountApi, removeAccount } from '../../api/api'
import { deleteAccount, getAccounts } from '../../actions/accounts.action'
import { formatAmount } from '../../utils/currency'
import AddAccount from '../AddAccount'

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
  addUser: {
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
  const { accounts, userInfo, dispatch, classes } = props
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (userInfo.id) {
      getAccountApi(userInfo.id)
        .then((results) => dispatch(getAccounts(results)))
        .catch((err) => console.log(err.message))
    }
  }, [userInfo])

  function handleClick (id) {
    removeAccount(id)
      .then(() => dispatch(deleteAccount(id)))
      .catch((err) => console.log(err.message))
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function generateRandom(status) {
    const rich = ['Oooh she a hoe!', 'Oooh she a rich hoe!', 'Girl I see you. get that 🍆', 'Being a sugar baby is not being a prostitute']
    const poor = ['Girl you can do better than this', 'I am very disapointed in you']
    
    switch (status) {
      case 'rich':
        const richIndex = Math.floor(Math.random() * rich.length)
        return rich[richIndex]
      case 'poor':
        const poorIndex = Math.floor(Math.random() * poor.length)
        return poor[poorIndex]
    }
  }

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
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleOpen} className={classes.addUser}>
                Add Account
              </Button>
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
                <AddAccount />
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
        {accounts.length ? (
          <>
            <Typography color="textSecondary" align="center">
            Get it girl! You got some moneyyyyyyy!
            </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Account Name</TableCell>
                    <TableCell align="right">Message</TableCell>
                    <TableCell align="right">Balance</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell component="th" scope="row">
                        {account.name}
                      </TableCell>
                      <TableCell align="right">{account.balance < 500 ? generateRandom('poor') : generateRandom('rich') }</TableCell>
                      <TableCell align="right">{formatAmount(account.balance)}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<DeleteIcon />}
                          onClick={() => handleClick(account.id)}
                        >Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Typography color="textSecondary" align="center">
            Girl you don't got any money, is everything alright? You need some money?
          </Typography>
        )}
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
