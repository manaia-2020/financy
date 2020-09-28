import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addNewTransaction } from '../api/api'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const AddTransaction = (props) => {
  useEffect(() => {

  }, [])

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#17E9E0'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      borderColor: '#A64AC9'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#17E9E0'
    }
  
  }))
  
  const [newTrans, setNewTrans] = useState({
    amount: 0,
    name: '',
    date: '',
    frequency: 0
  })

  const [ showRecurring, setShowRecurring ] = useState(false)

  const postTransaction = (event) => {
    event.preventDefault()
    const newTransToAdd = { ...newTrans, showRecurring }
    return addNewTransaction(props.userInfo.id, newTransToAdd)
      .then(newTransId => {
        return null
      })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewTrans({ ...newTrans, [name]: value })
  }

  const checkFloat = () => {
    const float = /^[-+]?[0-9]+\.[0-9]+$/
    return (Number(newTrans.amount) !== 0) ? newTrans.amount.match(float) : false
  }

  const toggleRecurring = () => {
    return (!showRecurring) ? setShowRecurring(true) : setShowRecurring(false)
  }

  const viewRecurringForm = () => {
    return (
      <>
        <label htmlFor="frequency">How Often</label>
        <select onChange={handleChange} name="frequency" id="frequency">
          <option value="7">Weekly</option>
          <option value="14">Fortnightly</option>
          <option value="28">Monthly</option>
          <option value="91">Quarterly</option>
          <option value="365">Annually</option>
        </select>
      </>
    )
  }

  const classes = useStyles()
  return (
    <div>
      <h1>Add New Transaction</h1>
      <form onSubmit={postTransaction}>
        <label htmlFor="amount">Amount</label>
        <input onChange = {handleChange} type="text" name="amount" id="amount" autoFocus={true}/>
        <label htmlFor="expenseName">Expense Name</label>
        <input type="text" name="expenseName" id="expenseName" onChange={handleChange}/>
        <label htmlFor="accountSelect">Select an Account</label>
        <select onChange={handleChange} name="accountSelect" id="accountSelect">
          <option value=""></option>
          {props.accounts.map(account => <option key={account.id} value={account.id}>{account.name}</option>)}
        </select>
        <input onChange = {handleChange}type="date" name="date" id="date"/>
        <label htmlFor="selectrecurring">Recurring?</label>
        <input type="checkbox" name="showRecurring" id="showRecurring" value={true} onClick={toggleRecurring}/>
        <button type="submit" disabled={!checkFloat()}>Add New Trans</button>
        {(showRecurring) ? viewRecurringForm() : null }
      </form>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Amount
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="amount"
              label="amount"
              name="amount"
              autoFocus
              onChange={handleChange}>
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="expenseName"
              label="expenseName"
              name="expenseName"
              autoFocus
              onChange={handleChange}>
            </TextField>
            
            <Grid container>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
     


    </div>
  )
}

function mapStatetoProps (state) {
  return {
    userInfo: state.addUserInfo,
    accounts: state.accounts
  }
}

export default connect(mapStatetoProps)(AddTransaction)
