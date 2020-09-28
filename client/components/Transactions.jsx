import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAccountApi, getUserAccountTransactions, getBalance } from '../api/api'
import { getAccounts } from '../actions/accounts.action'
import AddTransaction from './AddTransaction'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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
      }).catch((err) => {
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
      .then(items => {
        setTransactions(items.trans)
        return getBalance(accountId)
      })
      .then((newBalance) => {
        setBalances([...balances, newBalance])
        return null
      })
  }
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  console.log(transactions  )
  return (
    <div>
      <div>
        <AddTransaction />
      </div>
      <h1>View Transactions</h1>
      <form className={classes.formControl} onSubmit={requestTransactions}>
      <FormControl>
        <InputLabel>Account</InputLabel>
        <Select
          labelId="accountSelect"
          id="accountSelect"
          onChange={handleChange}
          name="accountSelect"
          defaultValue = ""
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.accounts.map(account => <MenuItem key={account.id} value={account.id}>{account.name}</MenuItem>)}
        </Select>
        <FormHelperText>Please Select An Account</FormHelperText>
        <Button type="submit" variant="contained" color="primary">Get</Button>
      </FormControl>
      </form>
      {transactions.length === 0 ? null : transactions.map(item => <h5 key={item.id}>{item.name}, {item.amount}</h5>)}
      {balances.length === null ? null : balances.map(item => <h5 key={item.id}>{item.balance}</h5>)}
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
