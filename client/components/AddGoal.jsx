import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addGoal } from '../actions/goals.action'
import { postGoal } from '../api/goals.api'
import { localStringToNumber } from '../utils/currency'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

function AddGoal (props) {
  const [goal, setGoal] = useState({
    name: '',
    amount: '',
    date: new Date().toLocaleDateString('en-CA')
  })

  function handleChange ({ target }) {
    const { name, value } = target
    // eslint-disable-next-line no-prototype-builtins
    if (goal.hasOwnProperty(name)) {
      setGoal({
        ...goal,
        [name]: value
      })
    }
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

  function handleSubmit (event) {
    const id = props.userInfo.id
    event.preventDefault()
    props.dispatch(addGoal(goal, id))
    
    //dirty dirty console logs, begone foul beasts
    postGoal(goal, id)
      .then(console.log)
      .catch(console.log)
  }

  function handleBlur ({ target }) {
    const { name, value } = target
    setGoal({
      ...goal,
      [name]: value
    })
  }

  function handleFocus ({ target }) {
    const { name, value } = target
    setGoal({
      ...goal,
      [name]: localStringToNumber(value)
    })
  }
  const classes = useStyles()
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add a New Goal
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="goalName"
              label="Savings Goal Name"
              name="name"
              autoFocus
              value={goal.name}
              onChange={handleChange}>
            </TextField>
            <FormControl fullWidth className={classes.form}>
              <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
              <Input
                id="amount"
                name="amount"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
            <TextField
              id="goalDate"
              label="Goal Date"
              type="date"
              name="date"
              required
              onChange={handleChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >Add New Goal</Button>
          </form>
        </div>
      </Container>
    </>
  )
}

const mapStateToProps = (state) => ({
  userInfo: state.addUserInfo
})

export default connect(mapStateToProps)(AddGoal)
