import React, { useState } from 'react'
import { signIn, isAuthenticated } from 'authenticare/client'
import { baseApiUrl as baseUrl } from '../config'

// Email = Username as authenticare requires a username field

const Login = (props) => {
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
          props.history.push('/register')
        }
        return null
    })
      .catch(err => console.log(err))
  }

  return (
    <div >
      <form onSubmit={handleClick}>
        <label htmlFor="email">email</label>
        <input type="email" id='email' name="email" placeholder='Email address' value={user.username} onChange={handleChange}></input>
        <label htmlFor="password">password</label>
        <input type="password" id='password' name="password" placeholder="password" value={user.password} onChange={handleChange} ></input>
        <button type='submit' onClick={handleClick}>Sign-In</button>
      </form>
    </div>
  )
}

export default Login
