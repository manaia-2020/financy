import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { IfAuthenticated } from '../Authenticated'
import { connect } from 'react-redux'

const lightColor = 'rgba(255, 255, 255, 0.7)'

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
    backgroundColor: '#eaeff1'
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  button: {
    borderColor: lightColor
  },
  header: {
    color: '#b76ed3'
  }
})

function Header (props) {
  const { classes, title } = props

  return (
    <IfAuthenticated>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography className={classes.header} variant="h5" component="h1">
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </IfAuthenticated>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    title: state.page
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Header))
