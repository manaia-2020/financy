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
import Button from '@material-ui/core/Button'

import AddAccount from './AddAccount'

function Accounts (props) {
  const { accounts, userInfo } = props
  useEffect(() => {
    getAccountApi(userInfo.id)
      .then((results) => {
        props.dispatch(getAccounts(results))
        return null
      }).catch((err) => {
        if (err) console.log(err.message)
      })
  }, [])

  function handleClick (id) {
    removeAccount(id)
    return props.dispatch(deleteAccount(id))
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
        {accounts.map((acc, i) => (
          <div key={acc[0].id}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography component="h1" variant="h5">{acc[0].name}
                </Typography>

              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Balance:${acc[0].balance}
                  <Button className={classes.submit}
                    onClick={() => handleClick(acc[0].id)}>
                      Remove
                  </Button>
                </Typography>
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
