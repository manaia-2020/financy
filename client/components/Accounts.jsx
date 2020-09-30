import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAccountApi, removeAccount } from '../api/api'
import { getAccounts, deleteAccount } from '../actions/accounts.action'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import AddAccount from './AddAccount'
import { formatAmount } from '../utils/currency'

function Accounts (props) {
  const { accounts, userInfo, dispatch } = props
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

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '50%',
      margin: 'auto'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    }
  }))

  const classes = useStyles()

  return (
    <>
      <AddAccount />
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
           Here are your accounts..
        </Typography>
        {accounts.map((account) => (
          <div key={account.id}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography component="h1" variant="h5">{account.name}
                </Typography>

              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ flex: 1 }}>
                  Balance: {formatAmount(account.balance)}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={() => handleClick(account.id)}
                >
                    Remove Account
                </Button>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}

      </div>
    </>
  )
}

function mapStateToProps (state) {
  return {
    accounts: state.accounts,
    userInfo: state.addUserInfo
  }
}

export default connect(mapStateToProps)(Accounts)
