import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { signIn, isAuthenticated } from 'authenticare/client'
import { baseApiUrl as baseUrl } from '../config'
import { getUserInfo } from '../api/api'
import { addUserInfo } from '../actions'

// Email = Username as authenticare requires a username field

const Login = (props) => {
  useEffect(() => {

  }, [props.location])

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const handleClick = event => {
    event.preventDefault()
    const { email, password } = user

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
      .catch(err => console.log(err))
  }

  return (
    <section id="login">
      <form onSubmit={handleClick}>
        <label htmlFor="email">Email Address</label>
        <input type="email" id='email' name="email" placeholder='Email Address' value={user.username} onChange={handleChange}></input>
        <label htmlFor="password">Password</label>
        <input type="password" id='password' name="password" placeholder="Password" value={user.password} onChange={handleChange} ></input>
        <button type='submit' onClick={handleClick}>Sign-In</button>
      </form>
    </section>
  )
}
function mapStateToProps (state) {
  return {
    userInfo: state.addUserInfo
  }
}

export default connect(mapStateToProps)(Login)
