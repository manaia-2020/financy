import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { signIn, isAuthenticated } from 'authenticare/client'
import { baseApiUrl as baseUrl } from '../config'
import { getUserInfo } from '../api/api'
import { addUserInfo } from '../actions'
import Navbar from './LandingPage/Navbar'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { isEmpty, isValidEmail } from '../utils/validation'

// Email = Username as authenticare requires a username field

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Financy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#17E9E0'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    borderColor: '#A64AC9'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#17E9E0'
  },
  nav: {
    backgroundColor: '#A64AC9'
  }

}))

const Login = (props) => {
  useEffect(() => {

  }, [props.location])

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState({
    emailError: null,
    passwordError: null
  })

  const [formError, setFormError] = useState('')

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const handleClick = event => {
    event.preventDefault()
    const { email, password } = user

    const inputs = document.querySelector('#login-form-js').elements

    Object.keys(user).forEach((detail) => {
      validateField({ target: inputs[detail] })
    })

    for (const value of Object.values(error)) if (value) return

    signIn({ username: email, password }, { baseUrl })
      .then((token) => {
        if (isAuthenticated()) {
          props.history.push('/dashboard')
          return getUserInfo(email)
        }
        return null
      })
      .then(res => {
        props.dispatch(addUserInfo(res))
        return null
      })
      .catch(err => {
        if (err.message === 'Bad Request') setFormError('The email or password you entered are incorrect')
      })
  }

  const updatedState = {}

  function validateField ({ target }) {
    const { name, value } = target

    const fieldSuccess = () => {
      updatedState[`${name}Error`] = null
      setError({
        ...error,
        ...updatedState
      })
    }

    const fieldError = (message) => {
      updatedState[`${name}Error`] = message
      setError({
        ...error,
        ...updatedState
      })
    }

    if (isEmpty(value)) {
      fieldError('This field is required!')
    } else fieldSuccess()

    if (name === 'email') {
      !isValidEmail(value) ? fieldError('Email is not valid!') : fieldSuccess()
    }
  }

  function handleFocus () {
    if (!formError) return
    setFormError('')
  }

  const classes = useStyles()
  return (
    <>
      <Navbar className={classes.nav} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form id="login-form-js" className={classes.form} noValidate onSubmit={handleClick} onFocus={handleFocus}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.username}
              onChange={handleChange}
              onBlur={validateField}
              error={!!error.emailError}
              helperText={error.emailError ? error.emailError : ''}
            >
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
              onBlur={validateField}
              error={!!error.passwordError}
              helperText={error.passwordError ? error.passwordError : ''}
            />
            {formError && <p style={{ color: '#ff1744' }}>{formError}</p>}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/#/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}
function mapStateToProps (state) {
  return {
    userInfo: state.addUserInfo
  }
}

export default connect(mapStateToProps)(Login)
