import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  getAccountApi,
  getUserAccountTransactions,
  getBalance
} from '../api/api'
import { getAccounts } from '../actions/accounts.action'
import AddTransaction from './AddTransaction'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Box from '@material-ui/core/Box'

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([])
  const [balances, setBalances] = useState([])
  const [accountId, setAccountId] = useState(0)

  const { id } = props.userInfo
  useEffect(() => {
    getAccountApi(id)
      .then((results) => {
        props.dispatch(getAccounts(results))
        return null
      })
      .catch((err) => {
        if (err) console.log(err)
      })
  }, [])

  const handleChange = (event) => {
    console.log(event.target.value)
    setAccountId(event.target.value)
  }

  const requestTransactions = (event) => {
    console.log(id)
    event.preventDefault()
    return getUserAccountTransactions(id, accountId)
      .then((items) => {
        setTransactions(items.trans)
        return getBalance(accountId)
      })
      .then((newBalance) => {
        setBalances(newBalance)
        return null
      })
  }
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }))
  const classes = useStyles()
  console.log(transactions)
  console.log(balances)

  const latestBalance = balances.balance

  return (
    <div>
      <div>
        <AddTransaction />
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <form className={classes.formControl} onSubmit={requestTransactions}>
          <Typography component="h1" variant="h5">
            View Transactions
          </Typography>
          <FormControl>
            <InputLabel>Account</InputLabel>
            <Select
              labelId="accountSelect"
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
            <FormHelperText>Please Select An Account</FormHelperText>
            <Button type="submit" variant="contained" color="primary">
              Get
            </Button>
          </FormControl>
          <Box component="div" display="inline">
            Current Balance: {latestBalance}
          </Box>
        </form>
        {transactions.length === 0
          ? null
          : transactions.map((item) => (
            <div key={item.id}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                      Name: {item.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.heading}>
                      Amount: ${item.amount}
                  </Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography className={classes.heading}>
                      Date: {item.date}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
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
export default connect(mapStatetoProps)(Transactions)
