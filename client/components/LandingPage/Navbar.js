import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { withStyles, ThemeProvider } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import AppBar from './modules/components/AppBar'
import Toolbar, { styles as toolbarStyles } from './modules/components/Toolbar'

import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './modules/theme'

const styles = (theme) => ({
  title: {
    fontSize: 24
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between'
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3)
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  }
})

function Navbar (props) {
  const { classes } = props

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <div className={classes.left} />
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              className={classes.title}
              href="/"
            >
              {'FINANCY'}
            </Link>
            <div className={classes.right}>
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
                href="/"
              >
                {'Home'}
              </Link>
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
                href="/#/about"
              >
                {'About'}
              </Link>
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
                href="/#/team"
              >
                {'Team'}
              </Link>
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
                href="/#/login"
              >
                {'Log In'}
              </Link>
              <Link
                variant="h6"
                underline="none"
                className={clsx(classes.rightLink, classes.linkSecondary)}
                href="/#/register"
              >
                {'Register'}
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <div className={classes.placeholder} />
    </div>
  )
}

Navbar.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar)