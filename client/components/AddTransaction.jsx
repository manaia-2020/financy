import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addNewTransaction } from '../api/api'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import clsx from 'clsx'

const AddTransaction = (props) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingTop: 200,
      paddingBottom: 200,
      padding: 100
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      borderColor: '#A64AC9'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#17E9E0'
    },
    buttonMargin: {
      marginTop: '10px',
      marginLeft: '60px'
    }
  }))

  const [newTrans, setNewTrans] = useState({
    amount: 0,
    name: '',
    date: '',
    frequency: 0
  })

  const [showRecurring] = useState(false)

  const postTransaction = (event) => {
    event.preventDefault()
    const newTransToAdd = { ...newTrans, showRecurring }
    return addNewTransaction(props.userInfo.id, newTransToAdd).then(
      (newTransId) => {
        return null
      }
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewTrans({ ...newTrans, [name]: value })
  }

  const classes = useStyles()
  return (
    <>
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Transaction
          </Typography>
          <form onSubmit={postTransaction} className={classes.form} noValidate>
            <InputLabel>Account</InputLabel>
            <Select
              id="accountSelect"
              onChange={handleChange}
              name="accountSelect"
              defaultValue=""
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {props.accounts.map((account) => (
                <MenuItem key={account.id} value={account.id}>
                  {account.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              name="amount"
              autoFocus
              onChange={handleChange}
            ></TextField>
            <InputLabel>Enter negative amount for outgoings</InputLabel>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="expenseName"
              label="Expense"
              name="expenseName"
              autoFocus
              onChange={handleChange}
            ></TextField>
            <TextField
              id="goalDate"
              label="Date"
              type="date"
              name="date"
              required
              onChange={handleChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Button type="submit" variant="contained" color="primary" className={clsx(classes.buttonMargin, classes.submit)}>
              Add Transaction
            </Button>
            <Grid container ></Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </>
  )
}

function mapStatetoProps (state) {
  return {
    userInfo: state.addUserInfo,
    accounts: state.accounts
  }
}

export default connect(mapStatetoProps)(AddTransaction)
