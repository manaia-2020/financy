import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { IfAuthenticated } from '../Authenticated'
import { logOff, isAuthenticated } from 'authenticare/client'

import PropTypes from 'prop-types'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Header from './Header'

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  categoryHeaderPrimary: {
    color: 'theme.palette.common.black'
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'r#b76ed3',
    '&:hover, &:focus': {
      backgroundColor: '#dbffff'
    }
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white
  },
  itemActiveItem: {
    color: '#4fc3f7'
  },
  itemPrimary: {
    fontSize: 'inherit'
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(2)
  }
})

const Nav = (props) => {
  const { history, dispatch, userInfo, classes, ...other } = props
  const handleClick = () => {
    logOff()
    if (!isAuthenticated()) {
      history.push('/')
    }
  }
  return (
    <>
      <IfAuthenticated>
        <Header />
        <Drawer variant="permanent" {...other}>
          <List disablePadding>
            <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
              Financy
            </ListItem>
            <ListItem className={clsx(classes.item, classes.itemCategory)}>
              <ListItemText classes={{ primary: classes.itemPrimary }}>
                Profile Overview <br />
                User Id: {userInfo.id} <br />
                Email: {userInfo.email}<br />
              </ListItemText>
            </ListItem>

            <ListItem className={classes.categoryHeader}>
              <Link to="/dashboard">Profile</Link>
            </ListItem>

            <ListItem className={classes.categoryHeader}>
              <Link to="/">
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary
                  }} >Rewards
                </ListItemText>
              </Link>
            </ListItem>

            <ListItem className={classes.categoryHeader}>
              <Link to="/goals">
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary
                  }} >Goals
                </ListItemText>
              </Link>
            </ListItem>

            <ListItem className={classes.categoryHeader}>
              <Link to="/transactions">
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary
                  }} >Transactions
                </ListItemText>
              </Link>
            </ListItem>
            <ListItem className={classes.categoryHeader}>
              <Link to="/accounts">
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary
                  }} >Accounts
                </ListItemText>
              </Link>
            </ListItem>
          </List>
          <Button onClick={handleClick}>Log off</Button>
        </Drawer>
      </IfAuthenticated>
    </>
  )
}

function mapStateToProps (state) {
  return {
    userInfo: state.addUserInfo
  }
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Nav))
