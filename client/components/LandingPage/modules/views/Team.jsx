import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '../components/Typography'

const styles = (theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden'
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5)
  },
  title: {
    marginBottom: theme.spacing(14)
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium
  },
  image: {
    height: 250,
    width: 175,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    justify: 'center',
    padding: 4,
    borderRadius: 5,
    transition: 'all ease-in-out .2s',
    '&:hover': {
      filter: 'brightness(.75)',
      transform: 'scale(1.2)'
    }
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7
  },
  button: {
    marginTop: theme.spacing(8)
  }
})

function Team (props) {
  const { classes } = props

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/images/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          Meet our Team of JNR DEVS
        </Typography>
        <div>
          <Grid container spacing={4}>
            <Grid item xs={6} md={3}>
              <div className={classes.item}>
                <img
                  src="images/tia.jpg"
                  alt="Tia"
                  className={classes.image}
                />
                <div className={classes.number}>Tia</div>
                <Typography variant="h5" align="center">
                  Software Engineer
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div className={classes.item}>
                <img
                  src="/images/josiah.jpg"
                  alt="Josiah"
                  className={classes.image}
                />
                <div className={classes.number}>Josiah</div>
                <Typography variant="h5" align="center">
                  Software Engineer
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div className={classes.item}>
                <img
                  src="images/brad.jpg"
                  alt="Brad"
                  className={classes.image}
                />
                <div className={classes.number}>Brad</div>
                <Typography variant="h5" align="center">
                  Software Engineer
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div className={classes.item}>
                <img
                  src="images/max.jpg"
                  alt="Max"
                  className={classes.image}
                />
                <div className={classes.number}>Max</div>
                <Typography variant="h5" align="center">
                  Software Engineer
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  )
}

Team.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Team)
