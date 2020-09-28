import React, { useState } from 'react'
import { connect } from 'react-redux'
import { register, isAuthenticated } from 'authenticare/client'
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
import { isEmpty, isPasswordMatch, isValidEmail } from '../utils/validation'

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
  }
}))

function Register (props) {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState({
    firstNameError: null,
    lastNameError: null,
    emailError: null,
    passwordError: null,
    confirmPasswordError: null
  })

  const [formError, setFormError] = useState('')

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setNewUser({ ...newUser, [name]: value })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    const { firstName, lastName, email, password, confirmPassword } = newUser

    const inputs = document.querySelector('#register-form-js').elements

    Object.keys(newUser).forEach((detail) => {
      validateField({ target: inputs[detail] })
    })

    for (const value of Object.values(error)) if (value) return

    if (password === confirmPassword) {
      register({ firstName, lastName, username: email, password }, { baseUrl })
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
          if (err.message === 'Bad Request') {
            setFormError('A user with that email already exists')
          }
        })
    }
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

    switch (name) {
      case 'email':
        !isValidEmail(value) ? fieldError('Email is not valid!') : fieldSuccess()
        break
      case 'confirmPassword':
        !isPasswordMatch(newUser.password, value) ? fieldError('Passwords must match!') : fieldSuccess()
        break
    }
  }

  function handleFocus () {
    if (!formError) return
    setFormError('')
  }

  const classes = useStyles()
  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form id="register-form-js" className={classes.form} onFocus={handleFocus} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleChange}
                  onBlur={validateField}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  type='email'
                  role='email'
                  error={!!error.firstNameError}
                  helperText={error.firstNameError ? error.firstNameError : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleChange}
                  onBlur={validateField}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  type='email'
                  role='email'
                  error={!!error.lastNameError}
                  helperText={error.lastNameError ? error.lastNameError : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  onBlur={validateField}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type='email'
                  role='email'
                  error={!!error.emailError}
                  helperText={error.emailError ? error.emailError : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  onBlur={validateField}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  role='password'
                  error={!!error.passwordError}
                  helperText={error.passwordError ? error.passwordError : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  onBlur={validateField}
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  role='confirmPassword'
                  error={!!error.confirmPasswordError}
                  helperText={error.confirmPasswordError ? error.confirmPasswordError : ''}
                />
              </Grid>
              <Grid item xs={12}>
                {formError && <p style={{ color: '#ff1744' }}>{formError}</p>}
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="sign your life away with us"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              onClick={submitHandler}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/#/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
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

export default connect(mapStateToProps)(Register)
