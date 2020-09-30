import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { IfAuthenticated } from '../Authenticated'
import { logOff, isAuthenticated } from 'authenticare/client'

import clsx from 'clsx'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Header from './Header'

const backgroundImage = 'https://images.unsplash.com/photo-1593672715438-d88a70629abe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: '#a64ac9',
    fontSize: 24,
    backgroundColor: 'black',
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: '#a64ac9',
    '&:hover, &:focus': {
      backgroundColor: '#dbffff'
    }
  },
  itemCategory: {
    backgroundColor: 'white',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: 30,
    color: '#a64ac9',
  },
  submit: {
    '&:hover, &:focus': {
      backgroundColor: '#dbffff'
    },
    width: 250,
    padding: 30,
    color: '#a64ac9'
  },
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9',
    backgroundPosition: 'center'
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
        <Drawer variant="permanent" {...other} className={classes.background}>
          <List disablePadding>
            <ListItem
              className={clsx(classes.item, classes.itemCategory)}>
              FINANCY
            </ListItem>
            <ListItem>
              <ListItemText>
                User ID: {userInfo.id} <br />
                Email: {userInfo.email}<br />
              </ListItemText>
            </ListItem>

            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <Button className={classes.submit}>Profile</Button>
            </Link>

            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button className={classes.submit}>Rewards</Button>
            </Link>

            <Link to="/goals" style={{ textDecoration: 'none' }}>
              <Button className={classes.submit}>Goals</Button>
            </Link>

            <Link to="/transactions" style={{ textDecoration: 'none' }}>
              <Button className={classes.submit}> Transactions</Button>
            </Link>

            <Link to="/accounts" style={{ textDecoration: 'none' }}>
              <Button className={classes.submit}>Accounts</Button>
            </Link>

          </List>
          <Button onClick={handleClick} className={classes.submit}>Log off</Button>
        </Drawer>
      </IfAuthenticated>
    </>
  )
}

function mapStateToProps(state) {
  return {
    userInfo: state.addUserInfo
  }
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Nav))
