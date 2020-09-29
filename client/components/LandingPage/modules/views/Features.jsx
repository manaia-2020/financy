import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '../components/Typography'

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5)
  },
  image: {
    height: 55
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180
  }
})

function Features (props) {
  const { classes } = props

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/images/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/images/productFeatures1.svg"
                alt="tracking"
              />
              <Typography variant="h6" className={classes.title}>
                Easy Track
              </Typography>
              <Typography variant="h5">
                {'We allow for constant tracking on all of your expenses,'}
                {'so you don"t ever miss a transaction.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/images/productFeatures2.svg"
                alt="graph"
              />
              <Typography variant="h6" className={classes.title}>
                Great Savings
              </Typography>
              <Typography variant="h5">
                {'We keep track of your expenses and disposable income'}
                {'so you have more money in your pocket'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/images/productFeatures3.svg"
                alt="money"
              />
              <Typography variant="h6" className={classes.title}>
                Rewards
              </Typography>
              <Typography variant="h5">
                {'We reward you for saving your money and hitting your goals, '}
                {'what could be more incentivising to be a money saving machine? '}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

Features.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Features)
