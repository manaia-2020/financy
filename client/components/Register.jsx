import React, { useState } from 'react'
import { connect } from 'react-redux'
import { register, isAuthenticated } from 'authenticare/client'
import { baseApiUrl as baseUrl } from '../config'

import { getUserInfo } from '../api/api'
import { addUserInfo } from '../actions'

function Register (props) {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setNewUser({ ...newUser, [name]: value })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    const { firstName, lastName, email, password, confirmPassword } = newUser

    if (password === confirmPassword) {
      register({ firstName, lastName, username: email, password }, { baseUrl })
        .then((token) => {
          if (isAuthenticated()) {
            console.log('user added')
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
  }
  return (
    <section id="register">
      <input type='email' role='email' name='firstName' placeholder='Name' onChange={handleChange}></input>
      <input type='email' role='email' name='lastName' placeholder='Last Name' onChange={handleChange}></input>
      <input type='email' role='email' name='email' placeholder='example@gmail.com' onChange={handleChange}></input>
      <input type='password' role='password' name='password' placeholder='password' onChange={handleChange}></input>
      <input type='password' role='confirmPassword' name='confirmPassword' placeholder='confirm password' onChange={handleChange}></input>
      <button type="submit" onClick={submitHandler}>Register</button>
    </section>
  )
}

function mapStateToProps (state) {
  return {
    userInfo: state.addUserInfo
  }
}

export default connect(mapStateToProps)(Register)
